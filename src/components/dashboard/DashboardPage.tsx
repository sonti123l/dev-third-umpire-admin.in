import {
  AddDetailsIntoFotaDb,
  getDevicesDetails,
  getFotaDetailsForDevice,
} from "@/services/dashboardservice/dashboardService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { validateVersion, bumpVersion } from "@/lib/versionUtils";
import {
  IconAlertCircle,
  IconServer,
  IconLogout,
  IconSignal,
  IconClock,
  IconHardDrive,
  IconActivity,
  IconCheck,
  IconGlobe,
  IconChevron,
  IconArrow,
  IconX,
  IconChip,
  IconRefresh,
} from "@/icons/icons";
import {
  TrackStatusPill,
  StatusBadge,
  formatDate,
} from "@/helpers/SubComponents";
import FileUploadZone from "@/helpers/SubComponents";
import { ALLOWED_ARCHIVE_EXTENSIONS } from "@/lib/constants/allowedArchiveExtensions";
import {
  FotaDetailsRow,
  DeviceListItem,
  FotaTextFields,
} from "@/lib/types/file-types";
import { read7zFile, readZipFile } from "@/helpers/readFileData";

const FiXED_FILE_SIZE = 5 * 1024 * 1024;

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [fotaForm, setFotaForm] = useState<FotaTextFields>({
    device_id: 0,
    device_old_version: "",
    device_new_version: "",
    web_old_version: "",
    web_new_version: "",
    fota_old_version: "",
    fota_new_version: "",
  });

  const [fota_update_server_id, set_fota_update_server_id] = useState<number>(
    () => {
      if (typeof window === "undefined") return 1;
      const stored = localStorage.getItem("fota_server_id");
      if (stored) return Number(stored);
      const isLocalhost =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1");
      return isLocalhost ? 3 : 1;
    },
  );

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate({ to: "/login" });
    } catch {
      toast.error("Logout failed");
    }
  };

  const [deviceZipFile, setDeviceZipFile] = useState<File | null>(null);
  const [webZipFile, setWebZipFile] = useState<File | null>(null);
  const [fotaZipFile, setFotaZipFile] = useState<File | null>(null);

  const [dragActiveZone, setDragActiveZone] = useState<string | null>(null);
  const [allowedFileSize, setAllowedFileSize] = useState(false);
  const [device_image_version, set_device_image_version] = useState<
    string | null
  >(null);
  const [web_image_version, set_web_image_version] = useState<string | null>(
    null,
  );

  /* ── Queries ── */
  const {
    data: devicesData,
    isLoading: isDevicesLoading,
    isError: isDevicesError,
    error: devicesError,
  } = useQuery({
    queryKey: ["devices", fota_update_server_id],
    queryFn: async () => {
      const result = await getDevicesDetails();
      return result?.data;
    },
    enabled: !!fota_update_server_id,
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });

  const devicesList: DeviceListItem[] = (devicesData as any)?.list ?? [];

  const selectedDevice = useMemo(
    () => devicesList.find((d) => d.id === fotaForm.device_id) ?? null,
    [devicesList, fotaForm.device_id],
  );

  useEffect(() => {
    if (isDevicesError) {
      toast.error((devicesError as Error)?.message || "Failed to load devices");
    }
  }, [isDevicesError, devicesError]);

  const handleGetDeviceHardWareUUid = (id: number) => {
    const getSelectedDevice = devicesList.filter(
      (eachDevice: any) => eachDevice.id === id,
    );
    return getSelectedDevice[0]?.hardwareUuid;
  };

  // Latest record only — used to populate the "current" version fields.
  const {
    data: fotaDetailsData,
    isFetching: isFotaDetailsFetching,
    isError: isFotaDetailsError,
  } = useQuery({
    queryKey: ["fota-latest", fotaForm.device_id],
    queryFn: async () => {
      const result = await getFotaDetailsForDevice(
        handleGetDeviceHardWareUUid(fotaForm.device_id),
      );
      return result?.data;
    },
    enabled: fotaForm.device_id > 0,
    retry: false,
  });

  const latestFotaRecord: FotaDetailsRow | null =
    (fotaDetailsData as any)?.fotaDetails ?? null;

  useEffect(() => {
    if (!latestFotaRecord) {
      if (selectedDevice) {
        setFotaForm((prev) => ({
          ...prev,
          device_old_version:
            selectedDevice.firmwareVersion ||
            selectedDevice.deviceVersion ||
            "0.0.0",
          web_old_version: (selectedDevice as any)?.web_version || "0.0.0",
          fota_old_version: "0.0.0",
        }));
      }
      return;
    }

    const deviceCurrent =
      (latestFotaRecord.deviceStatus === 1
        ? latestFotaRecord.deviceNewVersion
        : null) ||
      latestFotaRecord.deviceOldVersion ||
      selectedDevice?.firmwareVersion ||
      selectedDevice?.deviceVersion ||
      "0.0.0";

    const webCurrent =
      (latestFotaRecord.webStatus === 1
        ? latestFotaRecord.webNewVersion
        : null) ||
      latestFotaRecord.webOldVersion ||
      (selectedDevice as any)?.web_version ||
      "0.0.0";

    const fotaCurrent =
      (latestFotaRecord.fotaStatus === "APPLIED" ||
      latestFotaRecord.fotaStatus === "SUCCESS"
        ? latestFotaRecord.fotaNewVersion
        : null) ||
      latestFotaRecord.fotaOldVersion ||
      "0.0.0";

    setFotaForm((prev) => ({
      ...prev,
      device_old_version: deviceCurrent,
      web_old_version: webCurrent,
      fota_old_version: fotaCurrent,
    }));
  }, [latestFotaRecord, selectedDevice]);

  useEffect(() => {
    if (!isFotaDetailsError || fotaForm.device_id === 0) return;
    setFotaForm((prev) => ({
      ...prev,
      device_old_version: "",
      web_old_version: "",
      fota_old_version: "",
    }));
  }, [isFotaDetailsError]);

  const { mutateAsync: addFotaForDevice } = useMutation({
    mutationKey: ["fota-details-submit"],
    mutationFn: async (payload: FormData) => {
      const result = await AddDetailsIntoFotaDb(payload);
      return result;
    },
  });

  /* ── Derived ── */
  const isDeviceTrackActive = Boolean(
    fotaForm.device_new_version || deviceZipFile,
  );
  const isWebTrackActive = Boolean(fotaForm.web_new_version || webZipFile);
  const isFotaTrackActive = Boolean(fotaForm.fota_new_version || fotaZipFile);
  const hasAnyTrackActive =
    isDeviceTrackActive || isWebTrackActive || isFotaTrackActive;

  const hasAnyNewVersion = Boolean(
    fotaForm.device_new_version ||
    fotaForm.web_new_version ||
    fotaForm.fota_new_version,
  );

  const hasAnyFile = Boolean(deviceZipFile || webZipFile || fotaZipFile);

  const deviceValidation = useMemo(
    () =>
      validateVersion(fotaForm.device_new_version, fotaForm.device_old_version),
    [fotaForm.device_new_version, fotaForm.device_old_version],
  );

  const webValidation = useMemo(
    () => validateVersion(fotaForm.web_new_version, fotaForm.web_old_version),
    [fotaForm.web_new_version, fotaForm.web_old_version],
  );

  const fotaValidation = useMemo(
    () => validateVersion(fotaForm.fota_new_version, fotaForm.fota_old_version),
    [fotaForm.fota_new_version, fotaForm.fota_old_version],
  );

  const canSubmit = useMemo(() => {
    if (!fotaForm.device_id || !hasAnyTrackActive) return false;

    if (isDeviceTrackActive) {
      if (!deviceValidation.isValid || !deviceValidation.isGreater)
        return false;
    }
    if (isWebTrackActive) {
      if (!webValidation.isValid || !webValidation.isGreater) return false;
    }
    if (isFotaTrackActive) {
      if (!fotaValidation.isValid || !fotaValidation.isGreater) return false;
    }

    return true;
  }, [
    fotaForm.device_id,
    hasAnyTrackActive,
    isDeviceTrackActive,
    deviceValidation,
    isWebTrackActive,
    webValidation,
    isFotaTrackActive,
    fotaValidation,
  ]);

  /* ── Handlers ── */
  const handleServerChange = (serverId: number) => {
    set_fota_update_server_id(serverId);
    if (typeof window !== "undefined") {
      localStorage.setItem("fota_server_id", String(serverId));
    }
    setFotaForm((prev) => ({
      ...prev,
      device_id: 0,
      device_old_version: "",
      web_old_version: "",
      fota_old_version: "",
    }));
    setDeviceZipFile(null);
    setWebZipFile(null);
    setFotaZipFile(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fota_server_id", String(fota_update_server_id));
    }
  }, [fota_update_server_id]);

  const handleDeviceChange = (deviceId: number) => {
    setFotaForm((prev) => ({
      ...prev,
      device_id: deviceId,
      device_old_version: "",
      web_old_version: "",
      fota_old_version: "",
      device_new_version: "",
      web_new_version: "",
      fota_new_version: "",
    }));
    setDeviceZipFile(null);
    setWebZipFile(null);
    setFotaZipFile(null);
  };

  const handleVersionChange = (field: keyof FotaTextFields, value: string) => {
    setFotaForm((prev) => ({ ...prev, [field]: value }));
  };

  // const handleFileChange =
  //   (
  //     setter: (file: File | null) => void,
  //     component: "device" | "web" | "fota",
  //   ) =>
  //   async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     let file = e.target.files?.[0] ?? null;
  //     const fileName = file?.name.toLowerCase() ?? "";
  //     const fileExtension = file?.name.split(".")?.[1];
  //     const fileSize = file?.size ?? 0;
  //     const isAllowed = ALLOWED_ARCHIVE_EXTENSIONS.some((ext) =>
  //       fileName.endsWith(ext),
  //     );

  //     let check_firmware_device_image_version;
  //     let check_firmware_web_image_version;

  //     if (file) {
  //       if (fileExtension === "zip") {
  //         if (component === "device") {
  //           check_firmware_device_image_version =
  //             (await readZipFile(file, "TU_APP_IPC.py")) ?? "";
  //           set_device_image_version(check_firmware_device_image_version);
  //         } else {
  //           check_firmware_web_image_version =
  //             (await readZipFile(file, "TU_web/TU_Web_IPC.py")) ?? "";
  //           set_web_image_version(check_firmware_web_image_version);
  //         }
  //       } else {
  //         check_firmware_web_image_version = read7zFile(
  //           file,
  //           "TU_APP_IPC.py",
  //           "12345",
  //         );
  //       }
  //     }

  //     if (file && fileSize > FiXED_FILE_SIZE) {
  //       toast.error(`File size exceeds limit ${fileSize}`);
  //       setAllowedFileSize(false);
  //       file = null;
  //     } else {
  //       setAllowedFileSize(true);
  //     }

  //     if (file && !isAllowed) {
  //       toast.error("Please select a .zip or .7z file");
  //       e.target.value = "";
  //       setter(null);
  //       return;
  //     }
  //     setter(file);
  //   };

  const handleFileChange =
    (
      setter: (file: File | null) => void,
      component: "device" | "web" | "fota",
    ) =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      let file = e.target.files?.[0] ?? null;

      if (!file) {
        setter(null);
        return;
      }

      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.split(".").pop() ?? "";
      const fileSize = file.size;

      const isAllowed = ALLOWED_ARCHIVE_EXTENSIONS.some((ext) =>
        fileName.endsWith(ext),
      );

      if (!isAllowed) {
        toast.error("Please select a .zip or .7z file");
        e.target.value = "";
        setter(null);
        return;
      }

      if (fileSize > FiXED_FILE_SIZE) {
        toast.error(`File size exceeds limit ${FiXED_FILE_SIZE}`);
        setAllowedFileSize(false);
        e.target.value = "";
        setter(null);
        return;
      }

      setAllowedFileSize(true);

      try {
        if (fileExtension === "zip") {
          let version: string;

          if (component === "device") {
            version = await readZipFile(file, "TU_APP_IPC.py");

            set_device_image_version(version);

            setFotaForm((prev) => ({
              ...prev,
              device_new_version: version,
            }));
          } else if (component === "web") {
            version = await readZipFile(file, "TU_web/TU_Web_IPC.py");

            set_web_image_version(version);

            setFotaForm((prev) => ({
              ...prev,
              web_new_version: version,
            }));
          } else {
            // Add FOTA ZIP version extraction here once its
            // internal Python file path and version variable are known.
          }
        } else {
          toast.error("Only ZIP files are supported for version extraction.");
          e.target.value = "";
          setter(null);
          return;
        }

        setter(file);
        toast.success(
          `${component === "web" ? "Web" : component === "device" ? "Device" : "FOTA"} version detected`,
        );
      } catch (error) {
        console.error("Failed to read version from ZIP:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to read version from ZIP",
        );

        e.target.value = "";
        setter(null);

        if (component === "device") {
          set_device_image_version(null);
          setFotaForm((prev) => ({
            ...prev,
            device_new_version: "",
          }));
        } else if (component === "web") {
          set_web_image_version(null);
          setFotaForm((prev) => ({
            ...prev,
            web_new_version: "",
          }));
        }

        return;
      }
    };

  const handleSubmit = async () => {
    if (!fotaForm.device_id) {
      toast.error("Please select a device first");
      return;
    }
    if (!hasAnyTrackActive) {
      toast.error("Please provide at least one new version or upload a file");
      return;
    }

    if (
      isDeviceTrackActive &&
      (!deviceValidation.isValid || !deviceValidation.isGreater)
    ) {
      toast.error(
        deviceValidation.error ||
          "Device new version is invalid or not greater than current version",
      );
      return;
    }
    if (
      isWebTrackActive &&
      (!webValidation.isValid || !webValidation.isGreater)
    ) {
      toast.error(
        webValidation.error ||
          "Web new version is invalid or not greater than current version",
      );
      return;
    }
    if (
      isFotaTrackActive &&
      (!fotaValidation.isValid || !fotaValidation.isGreater)
    ) {
      toast.error(
        fotaValidation.error ||
          "FOTA new version is invalid or not greater than current version",
      );
      return;
    }

    const formData = new FormData();
    formData.append("device_id", String(fotaForm.device_id));
    formData.append("device_old_version", fotaForm.device_old_version);
    formData.append("device_new_version", fotaForm.device_new_version);
    formData.append("web_old_version", fotaForm.web_old_version);
    formData.append("web_new_version", fotaForm.web_new_version);
    formData.append("fota_old_version", fotaForm.fota_old_version);
    formData.append("fota_new_version", fotaForm.fota_new_version);

    if (user?.id) {
      formData.append("user_id", String(user.id));
    }
    if (user?.email) {
      formData.append("proposed_by", user.email);
      formData.append("proposed_by_name", user.name || "");
    }

    if (deviceZipFile) formData.append("device_zip", deviceZipFile);
    if (webZipFile) formData.append("web_zip", webZipFile);
    if (fotaZipFile) formData.append("fota_zip", fotaZipFile);

    try {
      await addFotaForDevice(formData);
      toast.success("FOTA update deployed successfully");
      // Reset new versions and files after success
      setFotaForm((prev) => ({
        ...prev,
        device_new_version: "",
        web_new_version: "",
        fota_new_version: "",
      }));
      setDeviceZipFile(null);
      setWebZipFile(null);
      setFotaZipFile(null);
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.error ||
        err?.data?.error ||
        err?.message ||
        "Failed to deploy FOTA update";
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm shadow-indigo-200">
              <IconActivity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight tracking-tight">
                FOTA Manager
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                Firmware Over-The-Air Deployment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 hidden md:inline">
                Environment
              </span>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {/* Local server option (commented out for deployment)
                <button
                  onClick={() => handleServerChange(3)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    fota_update_server_id === 3
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Local (8787)
                </button>
                */}
                <button
                  onClick={() => handleServerChange(1)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    fota_update_server_id === 1
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Production
                </button>
                <button
                  onClick={() => handleServerChange(2)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    fota_update_server_id === 2
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Test
                </button>
              </div>
            </div>

            {/* User Profile & Logout */}
            {user && (
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                <div className="flex flex-col text-right hidden sm:flex">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">
                    {user.role || "FOTA Manager"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all border border-rose-200 shadow-sm"
                  title="Log out of FOTA Manager"
                >
                  <IconLogout className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Device Selection Hero */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Target Device
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Select a device to inspect current versions and prepare
                  deployment
                </p>
              </div>
              {selectedDevice && <StatusBadge status={selectedDevice.status} />}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Device Selector */}
              <div className="lg:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Device
                </label>
                <div className="relative">
                  <select
                    value={fotaForm.device_id}
                    onChange={(e) => handleDeviceChange(Number(e.target.value))}
                    disabled={isDevicesLoading || devicesList.length === 0}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value={0} disabled>
                      {isDevicesLoading
                        ? "Loading devices..."
                        : devicesList.length === 0
                          ? "No devices available"
                          : "Choose a device..."}
                    </option>
                    {devicesList.map((device) => (
                      <option key={device.id} value={device.id}>
                        {device.name
                          ? `${device.name}  ·  #${device.id}`
                          : `Device #${device.id}`}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <IconChevron />
                  </div>
                </div>
              </div>

              {/* Device Meta */}
              <div className="lg:col-span-8">
                {selectedDevice ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <IconHardDrive className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Hardware UUID
                        </span>
                      </div>
                      <p
                        className="text-sm font-mono font-medium text-slate-700 truncate"
                        title={selectedDevice.hardwareUuid}
                      >
                        {selectedDevice.hardwareUuid}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <IconClock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Last Heartbeat
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-700">
                        {formatDate(selectedDevice.lastHeartbeat)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <IconSignal className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Current Firmware
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-700">
                        {selectedDevice.firmwareVersion ||
                          fotaForm.device_old_version ||
                          "UNKNOWN"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[96px] flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                      <IconChip className="w-4 h-4 text-slate-300" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">
                      Select a device to view telemetry
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Version Preview Bar */}
          {selectedDevice && (
            <div className="bg-slate-50/80 border-t border-slate-100 px-6 py-3 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Device
                </span>
                <span className="text-xs font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {fotaForm.device_old_version || "—"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Web
                </span>
                <span className="text-xs font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {fotaForm.web_old_version || "—"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  FOTA
                </span>
                <span className="text-xs font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {fotaForm.fota_old_version || "—"}
                </span>
              </div>
              {isFotaDetailsFetching && (
                <span className="text-xs text-indigo-600 font-medium animate-pulse ml-auto">
                  Fetching latest versions...
                </span>
              )}
            </div>
          )}
        </section>

        {/* Update Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Device Firmware */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="h-1 bg-indigo-500" />
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <IconChip className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Device Firmware
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Core system package
                    </p>
                  </div>
                </div>
                {isDeviceTrackActive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Pending Update
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Success by default
                  </span>
                )}
              </div>

              <div className="space-y-4 flex-1">
                {/* Version Flow */}
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Current
                    </label>
                    <div
                      className={`h-10 px-3 flex items-center rounded-lg border text-sm font-mono font-medium ${
                        isFotaDetailsFetching
                          ? "bg-indigo-50/50 border-indigo-100 text-indigo-400 animate-pulse"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      {isFotaDetailsFetching
                        ? "Loading..."
                        : fotaForm.device_old_version || "0.0.0"}
                    </div>
                  </div>
                  <div className="pb-2.5 text-slate-300">
                    <IconArrow className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      New
                    </label>
                    <input
                      type="text"
                      value={fotaForm.device_new_version}
                      onChange={(e) =>
                        handleVersionChange(
                          "device_new_version",
                          e.target.value,
                        )
                      }
                      disabled={!fotaForm.device_id}
                      placeholder="e.g. 1.2.0 or v1.2.0"
                      className={`h-10 px-3 w-full bg-white border rounded-lg text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed ${
                        fotaForm.device_new_version
                          ? deviceValidation.isValid &&
                            deviceValidation.isGreater
                            ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-emerald-50/20"
                            : "border-rose-400 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/20"
                          : "border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Validation messages */}
                {fotaForm.device_new_version && !deviceValidation.isValid && (
                  <p className="text-rose-600 text-xs font-medium flex items-center gap-1.5">
                    <IconAlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{deviceValidation.error}</span>
                  </p>
                )}
                {fotaForm.device_new_version &&
                  deviceValidation.isValid &&
                  deviceValidation.isGreater && (
                    <p className="text-emerald-600 text-xs font-medium flex items-center gap-1.5">
                      <IconCheck className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                      <span>
                        Valid upgrade: {fotaForm.device_old_version || "0.0.0"}{" "}
                        → {fotaForm.device_new_version}
                      </span>
                    </p>
                  )}
                {!fotaForm.device_new_version && deviceZipFile && (
                  <p className="text-amber-600 text-xs font-medium flex items-center gap-1.5">
                    <IconAlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                    <span>
                      Package archive attached — enter a greater target version
                    </span>
                  </p>
                )}

                {/* Quick Bump Helpers */}
                {fotaForm.device_id > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">
                      Quick Bump:
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleVersionChange(
                          "device_new_version",
                          bumpVersion(fotaForm.device_old_version, "patch"),
                        )
                      }
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors border border-slate-200"
                    >
                      +Patch (
                      {bumpVersion(fotaForm.device_old_version, "patch")})
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleVersionChange(
                          "device_new_version",
                          bumpVersion(fotaForm.device_old_version, "minor"),
                        )
                      }
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors border border-slate-200"
                    >
                      +Minor (
                      {bumpVersion(fotaForm.device_old_version, "minor")})
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleVersionChange(
                          "device_new_version",
                          bumpVersion(fotaForm.device_old_version, "major"),
                        )
                      }
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors border border-slate-200"
                    >
                      +Major (
                      {bumpVersion(fotaForm.device_old_version, "major")})
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Package Archive
                  </label>
                  <FileUploadZone
                    file={deviceZipFile}
                    onFileChange={handleFileChange(setDeviceZipFile, "device")}
                    disabled={!fotaForm.device_id}
                    label="device"
                    dragActive={dragActiveZone === "device"}
                    onDrag={(active) =>
                      setDragActiveZone(active ? "device" : null)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Web App */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="h-1 bg-sky-500" />
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                    <IconGlobe className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Web Application
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Frontend bundle
                    </p>
                  </div>
                </div>
                {isWebTrackActive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Pending Update
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Success by default
                  </span>
                )}
              </div>

              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Current
                    </label>
                    <div
                      className={`h-10 px-3 flex items-center rounded-lg border text-sm font-mono font-medium ${
                        isFotaDetailsFetching
                          ? "bg-sky-50/50 border-sky-100 text-sky-400 animate-pulse"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      {isFotaDetailsFetching
                        ? "Loading..."
                        : fotaForm.web_old_version || "0.0.0"}
                    </div>
                  </div>
                  <div className="pb-2.5 text-slate-300">
                    <IconArrow className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      New
                    </label>
                    <input
                      type="text"
                      value={fotaForm.web_new_version}
                      onChange={(e) =>
                        handleVersionChange("web_new_version", e.target.value)
                      }
                      disabled={!fotaForm.device_id || fotaForm.web_new_version ? true : false}
                      placeholder="e.g. 2.0.0 or v2.0.0"
                      className={`h-10 px-3 w-full bg-white border rounded-lg text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed ${
                        fotaForm.web_new_version
                          ? webValidation.isValid && webValidation.isGreater
                            ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-emerald-50/20"
                            : "border-rose-400 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/20"
                          : "border-slate-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Validation messages */}
                {fotaForm.web_new_version && !webValidation.isValid && (
                  <p className="text-rose-600 text-xs font-medium flex items-center gap-1.5">
                    <IconAlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{webValidation.error}</span>
                  </p>
                )}
                {fotaForm.web_new_version &&
                  webValidation.isValid &&
                  webValidation.isGreater && (
                    <p className="text-emerald-600 text-xs font-medium flex items-center gap-1.5">
                      <IconCheck className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                      <span>
                        Valid upgrade: {fotaForm.web_old_version || "0.0.0"} →{" "}
                        {fotaForm.web_new_version}
                      </span>
                    </p>
                  )}
                {!fotaForm.web_new_version && webZipFile && (
                  <p className="text-amber-600 text-xs font-medium flex items-center gap-1.5">
                    <IconAlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                    <span>
                      Package archive attached — enter a greater target version
                    </span>
                  </p>
                )}

                {/* Quick Bump Helpers */}
                {fotaForm.device_id > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">
                      Quick Bump:
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleVersionChange(
                          "web_new_version",
                          bumpVersion(fotaForm.web_old_version, "patch"),
                        )
                      }
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-slate-600 transition-colors border border-slate-200"
                    >
                      +Patch ({bumpVersion(fotaForm.web_old_version, "patch")})
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleVersionChange(
                          "web_new_version",
                          bumpVersion(fotaForm.web_old_version, "minor"),
                        )
                      }
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-slate-600 transition-colors border border-slate-200"
                    >
                      +Minor ({bumpVersion(fotaForm.web_old_version, "minor")})
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleVersionChange(
                          "web_new_version",
                          bumpVersion(fotaForm.web_old_version, "major"),
                        )
                      }
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-slate-600 transition-colors border border-slate-200"
                    >
                      +Major ({bumpVersion(fotaForm.web_old_version, "major")})
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Package Archive
                  </label>
                  <FileUploadZone
                    file={webZipFile}
                    onFileChange={handleFileChange(setWebZipFile, "web")}
                    disabled={!fotaForm.device_id}
                    label="web"
                    dragActive={dragActiveZone === "web"}
                    onDrag={(active) =>
                      setDragActiveZone(active ? "web" : null)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FOTA Updater */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="h-1 bg-violet-500" />
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                    <IconRefresh className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      FOTA Updater
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Updater agent package
                    </p>
                  </div>
                </div>
                {isFotaTrackActive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Pending Update
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Success by default
                  </span>
                )}
              </div>

              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Current
                    </label>
                    <div
                      className={`h-10 px-3 flex items-center rounded-lg border text-sm font-mono font-medium ${
                        isFotaDetailsFetching
                          ? "bg-violet-50/50 border-violet-100 text-violet-400 animate-pulse"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      {isFotaDetailsFetching
                        ? "Loading..."
                        : fotaForm.fota_old_version || "0.0.0"}
                    </div>
                  </div>
                  <div className="pb-2.5 text-slate-300">
                    <IconArrow className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      New
                    </label>
                    <input
                      type="text"
                      value={fotaForm.fota_new_version}
                      onChange={(e) =>
                        handleVersionChange("fota_new_version", e.target.value)
                      }
                      disabled={!fotaForm.device_id}
                      placeholder="e.g. 1.0.0 or v1.0.0"
                      className={`h-10 px-3 w-full bg-white border rounded-lg text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed ${
                        fotaForm.fota_new_version
                          ? fotaValidation.isValid && fotaValidation.isGreater
                            ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-emerald-50/20"
                            : "border-rose-400 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/20"
                          : "border-slate-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Validation messages */}
                {fotaForm.fota_new_version && !fotaValidation.isValid && (
                  <p className="text-rose-600 text-xs font-medium flex items-center gap-1.5">
                    <IconAlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{fotaValidation.error}</span>
                  </p>
                )}
                {fotaForm.fota_new_version &&
                  fotaValidation.isValid &&
                  fotaValidation.isGreater && (
                    <p className="text-emerald-600 text-xs font-medium flex items-center gap-1.5">
                      <IconCheck className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                      <span>
                        Valid upgrade: {fotaForm.fota_old_version || "0.0.0"} →{" "}
                        {fotaForm.fota_new_version}
                      </span>
                    </p>
                  )}
                {!fotaForm.fota_new_version && fotaZipFile && (
                  <p className="text-amber-600 text-xs font-medium flex items-center gap-1.5">
                    <IconAlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                    <span>
                      Package archive attached — enter a greater target version
                    </span>
                  </p>
                )}

                {/* Quick Bump Helpers */}
                {fotaForm.device_id > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">
                      Quick Bump:
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleVersionChange(
                          "fota_new_version",
                          bumpVersion(fotaForm.fota_old_version, "patch"),
                        )
                      }
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-violet-50 hover:text-violet-600 text-slate-600 transition-colors border border-slate-200"
                    >
                      +Patch ({bumpVersion(fotaForm.fota_old_version, "patch")})
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleVersionChange(
                          "fota_new_version",
                          bumpVersion(fotaForm.fota_old_version, "minor"),
                        )
                      }
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-violet-50 hover:text-violet-600 text-slate-600 transition-colors border border-slate-200"
                    >
                      +Minor ({bumpVersion(fotaForm.fota_old_version, "minor")})
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleVersionChange(
                          "fota_new_version",
                          bumpVersion(fotaForm.fota_old_version, "major"),
                        )
                      }
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-violet-50 hover:text-violet-600 text-slate-600 transition-colors border border-slate-200"
                    >
                      +Major ({bumpVersion(fotaForm.fota_old_version, "major")})
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Package Archive
                  </label>
                  <FileUploadZone
                    file={fotaZipFile}
                    onFileChange={handleFileChange(setFotaZipFile, "fota")}
                    disabled={!fotaForm.device_id}
                    label="fota"
                    dragActive={dragActiveZone === "fota"}
                    onDrag={(active) =>
                      setDragActiveZone(active ? "fota" : null)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest FOTA Record Card */}
        {selectedDevice && (
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <IconClock className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Latest Deployment Record
                    </h2>
                    {latestFotaRecord?.id && (
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                        #{latestFotaRecord.id}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Most recent firmware, web, and updater release for this
                    device
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate({
                    to: `/${fotaForm.device_id}/fota-information`,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 hover:border-indigo-200 transition-all shadow-sm active:scale-95"
              >
                <span>View Full History</span>
                <IconArrow className="w-3.5 h-3.5 text-indigo-600" />
              </button>
            </div>

            {latestFotaRecord ? (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Device Track */}
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Device Firmware
                      </span>
                      <TrackStatusPill value={latestFotaRecord.deviceStatus} />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-sm font-mono font-semibold text-slate-800">
                        {latestFotaRecord.deviceOldVersion || "—"}
                      </span>
                      <span className="text-slate-400 text-xs">→</span>
                      <span className="text-sm font-mono font-bold text-indigo-600">
                        {latestFotaRecord.deviceNewVersion || "—"}
                      </span>
                    </div>
                    <div
                      className="text-[11px] text-slate-500 truncate"
                      title={latestFotaRecord.deviceFotaUrl || "No archive"}
                    >
                      Package:{" "}
                      <span className="font-mono text-slate-700">
                        {latestFotaRecord.deviceFotaUrl || "None"}
                      </span>
                    </div>
                  </div>

                  {/* Web Track */}
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Web Application
                      </span>
                      <TrackStatusPill value={latestFotaRecord.webStatus} />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-sm font-mono font-semibold text-slate-800">
                        {latestFotaRecord.webOldVersion || "—"}
                      </span>
                      <span className="text-slate-400 text-xs">→</span>
                      <span className="text-sm font-mono font-bold text-sky-600">
                        {latestFotaRecord.webNewVersion || "—"}
                      </span>
                    </div>
                    <div
                      className="text-[11px] text-slate-500 truncate"
                      title={latestFotaRecord.webFotaUrl || "No archive"}
                    >
                      Package:{" "}
                      <span className="font-mono text-slate-700">
                        {latestFotaRecord.webFotaUrl || "None"}
                      </span>
                    </div>
                  </div>

                  {/* FOTA Track */}
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        FOTA Updater
                      </span>
                      <TrackStatusPill value={latestFotaRecord.fotaStatus} />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-sm font-mono font-semibold text-slate-800">
                        {latestFotaRecord.fotaOldVersion || "—"}
                      </span>
                      <span className="text-slate-400 text-xs">→</span>
                      <span className="text-sm font-mono font-bold text-violet-600">
                        {latestFotaRecord.fotaNewVersion || "—"}
                      </span>
                    </div>
                    <div
                      className="text-[11px] text-slate-500 truncate"
                      title={latestFotaRecord.fotaUpdateUrl || "No archive"}
                    >
                      Package:{" "}
                      <span className="font-mono text-slate-700">
                        {latestFotaRecord.fotaUpdateUrl || "None"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>Last Deployed:</span>
                    <span className="font-medium text-slate-700">
                      {formatDate(latestFotaRecord.createdAt)}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      navigate({
                        to: `/${fotaForm.device_id}/fota-information`,
                      })
                    }
                    className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View all previous updates in history table</span>
                    <IconArrow className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50/40">
                <p className="text-sm font-medium text-slate-600">
                  No previous FOTA deployments recorded for this device.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Configure versions and upload package archives above to deploy
                  the initial release.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Deployment Summary & Action */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  canSubmit ? "bg-indigo-50" : "bg-slate-100"
                }`}
              >
                <IconServer
                  className={`w-5 h-5 ${canSubmit ? "text-indigo-600" : "text-slate-400"}`}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Deployment Summary
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                  <div className="flex items-center gap-1.5">
                    {fotaForm.device_id ? (
                      <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
                    )}
                    <span
                      className={`text-xs font-medium ${fotaForm.device_id ? "text-slate-700" : "text-slate-400"}`}
                    >
                      Device selected
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {hasAnyNewVersion ? (
                      <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
                    )}
                    <span
                      className={`text-xs font-medium ${hasAnyNewVersion ? "text-slate-700" : "text-slate-400"}`}
                    >
                      Version defined
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {hasAnyFile ? (
                      <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
                    )}
                    <span
                      className={`text-xs font-medium ${hasAnyFile ? "text-slate-700" : "text-slate-400"}`}
                    >
                      File attached
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`flex items-center justify-center gap-2 px-6 h-11 rounded-xl text-sm font-bold transition-all duration-200 min-w-[180px] ${
                canSubmit
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-sm shadow-indigo-200"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <IconRefresh className="w-4 h-4" />
              Deploy FOTA Update
            </button>
          </div>
        </section>
      </main>

      {/* Footer spacer for mobile scrolling comfort */}
      <div className="h-12" />
    </div>
  );
}
