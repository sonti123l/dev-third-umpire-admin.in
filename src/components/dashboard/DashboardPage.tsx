import DeviceColumns from "@/helpers/DeviceColumns";
import {
  AddDetailsIntoFotaDb,
  getDevicesDetails,
} from "@/services/dashboardservice/dashboardService";
import { useQuery, useMutation } from "@tanstack/react-query";
import TanStackTable from "../core/TanstackTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FotaDetails } from "@/types/fotaDetails";

export default function DashboardPage() {
  const [devicesList, setDevicesList] = useState([]);

  // const { data }
  const [fotaForm, setFotaForm] = useState<FotaDetails>({
    device_id: 0,
    device_old_version: "",
    device_new_version: "",
    web_old_version: "",
    web_new_version: "",
    device_update_url: "",
    web_update_url: "",
  });

  const { mutateAsync: addFotaForDevice } = useMutation({
    mutationKey: ["fota-details"],
    mutationFn: async (payload: FotaDetails) => {
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

  const handleSubmit = () => {
    addFotaForDevice(fotaForm);
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
            <label className={labelClass}>Update URL</label>
            <input
              type="url"
              name="device_update_url"
              value={fotaForm.device_update_url}
              onChange={handleChange}
              placeholder="https://firmware.example.com/v1.1.0.bin"
              className={inputClass}
            />
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
            <label className={labelClass}>Update URL</label>
            <input
              type="url"
              name="web_update_url"
              value={fotaForm.web_update_url}
              onChange={handleChange}
              placeholder="https://releases.example.com/web/v2.4.0"
              className={inputClass}
            />
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
