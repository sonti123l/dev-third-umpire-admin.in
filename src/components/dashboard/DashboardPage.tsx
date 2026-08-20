import DeviceColumns from "@/helpers/DeviceColumns";
import {
  AddDetailsIntoFotaDb,
  getDevicesDetails,
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

// Archive extensions accepted for firmware/web/fota uploads.
const ALLOWED_ARCHIVE_EXTENSIONS = [".zip", ".7z"];

export default function DashboardPage() {
  const [devicesList, setDevicesList] = useState([]);

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

  const { mutateAsync: addFotaForDevice } = useMutation({
    mutationKey: ["fota-details"],
    mutationFn: async (payload: FormData) => {
      console.log(payload);
      const result = await AddDetailsIntoFotaDb(payload);
      return result;
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFotaForm((prev) => ({
      ...prev,
      [name]: name === "device_id" ? Number(value) : value,
    }));
  };

  const handleFileChange =
    (setter: (file: File | null) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      console.log(e.target.files);

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
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      await addFotaForDevice(formData);

      toast.success("FOTA update submitted");
    } catch (err) {
      toast.error("Failed to submit FOTA update");
    }
  };

  // const { data, isSuccess, isLoading, isError, error } = useQuery({
  //   queryKey: ["devices"],
  //   queryFn: async () => {
  //     const result = await getDevicesDetails();
  //     return result?.data;
  //   },
  //   staleTime: 60000,
  //   refetchOnWindowFocus: true,
  // });

  // useEffect(() => {
  //   if (!isSuccess) return;
  //   setDevicesList(data?.devices);
  // }, [isSuccess]);

  // if (isError) {
  //   toast.error(error?.message || "Devices list not found");
  // }

  const inputClass =
    "h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400 w-full";

  const fileInputClass =
    "h-9 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 w-full file:mr-3 file:h-full file:border-0 file:bg-slate-200 file:px-3 file:text-xs file:font-medium file:text-slate-700 cursor-pointer";

  const labelClass = "text-xs font-medium text-slate-500";

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-slate-900 mb-6">
        Dashboard Page
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="max-w-2xl">
          <h2 className="text-lg font-medium text-slate-900 mb-6">
            FOTA update details
          </h2>

          {/* Device ID */}
          <div className="mb-5">
            <div className="flex flex-col gap-1 w-40">
              <label className={labelClass}>Device ID</label>
              <input
                type="text"
                name="device_id"
                value={fotaForm.device_id}
                onChange={handleChange}
                className={inputClass}
              />
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
                  value={fotaForm.device_old_version}
                  onChange={handleChange}
                  placeholder="e.g. v1.0.0"
                  className={inputClass}
                  required
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
                  value={fotaForm.web_old_version}
                  onChange={handleChange}
                  placeholder="e.g. v2.3.0"
                  className={inputClass}
                  required
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
                  value={fotaForm.fota_old_version}
                  onChange={handleChange}
                  placeholder="e.g. v2.3.0"
                  className={inputClass}
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
            type="submit"
            className="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 h-10 rounded-lg hover:bg-slate-700 active:scale-95 transition cursor-pointer"
          >
            Submit FOTA update
          </button>
        </div>
      </form>

      {/* <TanStackTable columns={DeviceColumns()} data={devicesList} /> */}
    </div>
  );
}
