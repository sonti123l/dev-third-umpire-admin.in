import DeviceColumns from "@/helpers/DeviceColumns";
import {
  AddDetailsIntoFotaDb,
  getDevicesDetails,
  getFotaDetailsForDevice,
} from "@/services/dashboardservice/dashboardService";
import { useQuery, useMutation } from "@tanstack/react-query";
import TanStackTable from "../core/TanstackTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Text-only fields kept in fotaForm. File uploads (device/web/fota zip) are
// tracked in separate state below since File objects don't belong in the
// same object we might otherwise JSON.stringify.
type FotaTextFields = {
  device_id: number;
  device_old_version: string;
  device_new_version: string;
  web_old_version: string;
  web_new_version: string;
  fota_old_version: string;
  fota_new_version: string;
};

// Shape of a row returned by GET /devices-list (backed by tu_devices).
type DeviceListItem = {
  id: number;
  hardwareUuid: string;
  name: string | null;
  siteId: number | null;
  status: string | null;
  firmwareVersion: string | null;
  deviceVersion: string | null;
  lastHeartbeat: string | null;
  createdAt: string | null;
};

// Shape of the row returned by GET /:deviceId/get-fota-details — the most
// recent FOTA record for that device, used to pre-fill "old version"
// fields with whatever that device's last recorded version was.
type FotaDetailsRow = {
  deviceOldVersion: string | null;
  deviceNewVersion: string | null;
  webOldVersion: string | null;
  webNewVersion: string | null;
  fotaOldVersion: string | null;
  fotaNewVersion: string | null;
  [key: string]: unknown;
};

// Archive extensions accepted for firmware/web/fota uploads.
const ALLOWED_ARCHIVE_EXTENSIONS = [".zip", ".7z"];

export default function DashboardPage() {
  const [fotaForm, setFotaForm] = useState<FotaTextFields>({
    device_id: 0,
    device_old_version: "",
    device_new_version: "",
    web_old_version: "",
    web_new_version: "",
    fota_old_version: "",
    fota_new_version: "",
  });

  // Selected files, only attached to the request when "Submit FOTA update"
  // is clicked — no automatic upload on file selection.
  const [deviceZipFile, setDeviceZipFile] = useState<File | null>(null);
  const [webZipFile, setWebZipFile] = useState<File | null>(null);
  const [fotaZipFile, setFotaZipFile] = useState<File | null>(null);

  // GET /devices-list — populates the Device <select> below so users can
  // only submit a device_id that actually exists in tu_devices (avoids
  // the FOREIGN KEY constraint failed error from typing an arbitrary ID).
  const {
    data: devicesData,
    isLoading: isDevicesLoading,
    isError: isDevicesError,
    error: devicesError,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const result = await getDevicesDetails();
      return result?.data;
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });

  const devicesList: DeviceListItem[] = devicesData?.list ?? [];

  useEffect(() => {
    if (isDevicesError) {
      toast.error(
        (devicesError as Error)?.message || "Devices list not found",
      );
    }
  }, [isDevicesError, devicesError]);

  // GET /:deviceId/get-fota-details — fetched whenever a device is
  // selected, so the "old version" fields can be pre-filled with that
  // device's most recently recorded version instead of the user typing
  // it in by hand. Disabled until a real device is chosen (device_id > 0).
  // NOTE: requires a getFotaDetailsForDevice(deviceId) function to exist
  // in dashboardService.ts, hitting GET /:deviceId/get-fota-details.
  const {
    data: fotaDetailsData,
    isFetching: isFotaDetailsFetching,
    isError: isFotaDetailsError,
    error: fotaDetailsErrorObj,
  } = useQuery({
    queryKey: ["fota-details", fotaForm.device_id],
    queryFn: async () => {
      const result = await getFotaDetailsForDevice(fotaForm.device_id);
      return result?.data;
    },
    enabled: fotaForm.device_id > 0,
    retry: false,
  });

  // Pre-fill old-version fields once the selected device's latest FOTA
  // record comes back. A device with no prior record (404) just leaves
  // these blank for manual entry — that's expected for a brand-new device.
  useEffect(() => {
    if (!fotaDetailsData?.fotaDetails) return;

    const latest: FotaDetailsRow = fotaDetailsData.fotaDetails;

    setFotaForm((prev) => ({
      ...prev,
      device_old_version:
        latest.deviceNewVersion ?? latest.deviceOldVersion ?? "",
      web_old_version: latest.webNewVersion ?? latest.webOldVersion ?? "",
      fota_old_version: latest.fotaNewVersion ?? latest.fotaOldVersion ?? "",
    }));
  }, [fotaDetailsData]);

  // 404 from get-fota-details just means "no history yet" — not a real
  // error, so clear the old-version fields quietly instead of toasting.
  useEffect(() => {
    if (!isFotaDetailsError || fotaForm.device_id === 0) return;

    setFotaForm((prev) => ({
      ...prev,
      device_old_version: "",
      web_old_version: "",
      fota_old_version: "",
    }));
  }, [isFotaDetailsError, fotaDetailsErrorObj]);

  const { mutateAsync: addFotaForDevice } = useMutation({
    mutationKey: ["fota-details-submit"],
    mutationFn: async (payload: FormData) => {
      const result = await AddDetailsIntoFotaDb(payload);
      return result;
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "device_id") {
      // Switching devices: reset old-version fields immediately so stale
      // values from the previously selected device don't linger while
      // the new device's fota-details query is in flight.
      setFotaForm((prev) => ({
        ...prev,
        device_id: Number(value),
        device_old_version: "",
        web_old_version: "",
        fota_old_version: "",
      }));
      return;
    }

    setFotaForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange =
    (setter: (file: File | null) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;

      const fileName = file?.name.toLowerCase() ?? "";
      const isAllowed = ALLOWED_ARCHIVE_EXTENSIONS.some((ext) =>
        fileName.endsWith(ext),
      );

      if (file && !isAllowed) {
        toast.error("Please select a .zip or .7z file");
        e.target.value = "";
        setter(null);
        return;
      }

      setter(file);
    };

  const handleSubmit = async () => {
    if (!fotaForm.device_id) {
      toast.error("Please select a device");
      return;
    }

    let formData = new FormData();

    formData.append("device_id", String(fotaForm.device_id));
    formData.append("device_old_version", fotaForm.device_old_version);
    formData.append("device_new_version", fotaForm.device_new_version);
    formData.append("web_old_version", fotaForm.web_old_version);
    formData.append("web_new_version", fotaForm.web_new_version);
    formData.append("fota_old_version", fotaForm.fota_old_version);
    formData.append("fota_new_version", fotaForm.fota_new_version);

    if (deviceZipFile) formData.append("device_zip", deviceZipFile);
    if (webZipFile) formData.append("web_zip", webZipFile);
    if (fotaZipFile) formData.append("fota_zip", fotaZipFile);

    try {
      await addFotaForDevice(formData);
      toast.success("FOTA update submitted");
    } catch (err) {
      toast.error("Failed to submit FOTA update");
    }
  };

  const inputClass =
    "h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400 w-full";

  const readOnlyInputClass =
    "h-9 px-3 text-sm text-slate-500 bg-slate-100 border border-slate-200 rounded-lg outline-none w-full cursor-not-allowed";

  const fileInputClass =
    "h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 w-full file:mr-3 file:h-full file:border-0 file:bg-slate-200 file:px-3 file:text-xs file:font-medium file:text-slate-700 cursor-pointer";

  const labelClass = "text-xs font-medium text-slate-500";

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-slate-900 mb-6">
        Dashboard Page
      </h1>

      <div className="max-w-2xl">
        <h2 className="text-lg font-medium text-slate-900 mb-6">
          FOTA update details
        </h2>

        {/* Device selection — populated from GET /devices-list. Choosing a
            device also triggers GET /:deviceId/get-fota-details to
            pre-fill the old-version fields below. */}
        <div className="mb-5">
          <div className="flex flex-col gap-1 w-64">
            <label className={labelClass}>Device</label>
            <select
              name="device_id"
              value={fotaForm.device_id}
              onChange={handleChange}
              className={inputClass}
              disabled={isDevicesLoading || devicesList.length === 0}
            >
              <option value={0} disabled>
                {isDevicesLoading
                  ? "Loading devices..."
                  : devicesList.length === 0
                    ? "No devices found"
                    : "Select a device"}
              </option>
              {devicesList.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name
                    ? `${device.name} (#${device.id})`
                    : `Device #${device.id}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Device Firmware */}
        <fieldset className="border border-slate-200 rounded-xl p-5 mb-5">
          <legend className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-1.5">
            Device firmware
          </legend>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Old version</label>
              <input
                type="text"
                name="device_old_version"
                value={
                  isFotaDetailsFetching
                    ? "Loading..."
                    : fotaForm.device_old_version
                }
                readOnly
                placeholder="Select a device"
                className={readOnlyInputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>New version</label>
              <input
                type="text"
                name="device_new_version"
                value={fotaForm.device_new_version}
                onChange={handleChange}
                placeholder="e.g. v1.1.0"
                className={inputClass}
                disabled={!fotaForm.device_id}
              />
            </div>
          </div>
          <hr className="border-slate-100 mb-3" />
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Upload archive</label>
            <input
              type="file"
              accept=".zip,.7z"
              onChange={handleFileChange(setDeviceZipFile)}
              className={fileInputClass}
            />
            {deviceZipFile && (
              <span className="text-xs text-slate-500 mt-1">
                {deviceZipFile.name}
              </span>
            )}
          </div>
        </fieldset>

        {/* Web App */}
        <fieldset className="border border-slate-200 rounded-xl p-5 mb-6">
          <legend className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-1.5">
            Web app
          </legend>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Old version</label>
              <input
                type="text"
                name="web_old_version"
                value={
                  isFotaDetailsFetching
                    ? "Loading..."
                    : fotaForm.web_old_version
                }
                readOnly
                placeholder="Select a device"
                className={readOnlyInputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>New version</label>
              <input
                type="text"
                name="web_new_version"
                value={fotaForm.web_new_version}
                onChange={handleChange}
                placeholder="e.g. v2.4.0"
                className={inputClass}
                disabled={!fotaForm.device_id}
              />
            </div>
          </div>
          <hr className="border-slate-100 mb-3" />
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Upload archive</label>
            <input
              type="file"
              accept=".zip,.7z"
              onChange={handleFileChange(setWebZipFile)}
              className={fileInputClass}
            />
            {webZipFile && (
              <span className="text-xs text-slate-500 mt-1">
                {webZipFile.name}
              </span>
            )}
          </div>
        </fieldset>

        {/* Fota updater */}
        <fieldset className="border border-slate-200 rounded-xl p-5 mb-6">
          <legend className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-1.5">
            Fota app
          </legend>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Old version</label>
              <input
                type="text"
                name="fota_old_version"
                value={
                  isFotaDetailsFetching
                    ? "Loading..."
                    : fotaForm.fota_old_version
                }
                readOnly
                placeholder="Select a device"
                className={readOnlyInputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>New version</label>
              <input
                type="text"
                name="fota_new_version"
                value={fotaForm.fota_new_version}
                onChange={handleChange}
                placeholder="e.g. v2.4.0"
                className={inputClass}
                disabled={!fotaForm.device_id}
              />
            </div>
          </div>
          <hr className="border-slate-100 mb-3" />
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Upload archive</label>
            <input
              type="file"
              accept=".zip,.7z"
              onChange={handleFileChange(setFotaZipFile)}
              className={fileInputClass}
            />
            {fotaZipFile && (
              <span className="text-xs text-slate-500 mt-1">
                {fotaZipFile.name}
              </span>
            )}
          </div>
        </fieldset>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 h-10 rounded-lg hover:bg-slate-700 active:scale-95 transition cursor-pointer"
        >
          Submit FOTA update
        </button>
      </div>

      {/* <TanStackTable columns={DeviceColumns()} data={devicesList} /> */}
    </div>
  );
}