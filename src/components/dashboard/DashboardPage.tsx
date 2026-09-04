import FotaHistoryColumns from "@/helpers/FotaHistoryColumns";
import {
  AddDetailsIntoFotaDb,
  getDevicesDetails,
  getFotaDetailsForDevice,
  getFotaList,
} from "@/services/dashboardservice/dashboardService";
import { useQuery, useMutation } from "@tanstack/react-query";
import TanStackTable from "../core/TanstackTable";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";

/* ─────────────────────────── Types ─────────────────────────── */

type FotaTextFields = {
  device_id: number;
  device_old_version: string;
  device_new_version: string;
  web_old_version: string;
  web_new_version: string;
  fota_old_version: string;
  fota_new_version: string;
};

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

type FotaDetailsRow = {
  id: number;
  deviceId: number;
  deviceOldVersion: string;
  deviceNewVersion: string;
  webOldVersion: string;
  webNewVersion: string;
  deviceStatus: number;
  webStatus: number;
  deviceFotaUrl: string;
  webFotaUrl: string;
  fotaOldVersion: string;
  fotaNewVersion: string;
  fotaUpdateUrl: string;
  fotaStatus: string;
  createdAt: string | null;
  [key: string]: unknown;
};

/* ─────────────────────────── Constants ─────────────────────────── */

const ALLOWED_ARCHIVE_EXTENSIONS = [".zip", ".7z"];

/* ─────────────────────────── Icons ─────────────────────────── */

const IconServer = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
    />
  </svg>
);

const IconChip = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  </svg>
);

const IconGlobe = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

const IconRefresh = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const IconUpload = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const IconArrow = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const IconX = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const IconChevron = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const IconActivity = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const IconHardDrive = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    />
  </svg>
);

const IconClock = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconSignal = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
    />
  </svg>
);

/* ─────────────────────────── Helpers ─────────────────────────── */

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";

  // Tell JavaScript the input is UTC
  const d = new Date(dateStr.endsWith("Z") ? dateStr : dateStr + "Z");

  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
/* ─────────────────────────── Sub-Components ─────────────────────────── */

function StatusBadge({ status }: { status: string | null }) {
  const isOnline = status?.toLowerCase() === "online";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        isOnline
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-amber-50 text-amber-700 border-amber-200"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-500" : "bg-amber-500"}`}
      />
      {status || "Unknown"}
    </span>
  );
}

function FileUploadZone({
  file,
  onFileChange,
  disabled,
  label,
  dragActive,
  onDrag,
}: {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  label: string;
  dragActive: boolean;
  onDrag: (active: boolean) => void;
}) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDrag(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    onDrag(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrag(false);
    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;
    const name = dropped.name.toLowerCase();
    const ok = ALLOWED_ARCHIVE_EXTENSIONS.some((ext) => name.endsWith(ext));
    if (!ok) {
      toast.error("Please drop a .zip or .7z file");
      return;
    }
    // Simulate change event
    const dt = new DataTransfer();
    dt.items.add(dropped);
    const synthetic = {
      target: { files: dt.files },
    } as React.ChangeEvent<HTMLInputElement>;
    onFileChange(synthetic);
  };

  if (file) {
    return (
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
            <IconUpload className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {file.name}
            </p>
            <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
          </div>
        </div>
        <button
          onClick={() =>
            onFileChange({
              target: { files: null },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
        >
          <IconX />
        </button>
      </div>
    );
  }

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center w-full h-28 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
        disabled
          ? "bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed"
          : dragActive
            ? "bg-indigo-50 border-indigo-400"
            : "bg-slate-50/50 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <div
          className={`p-2 rounded-lg transition-colors ${dragActive ? "bg-indigo-100" : "bg-slate-100"}`}
        >
          <IconUpload
            className={`w-5 h-5 ${dragActive ? "text-indigo-600" : "text-slate-400"}`}
          />
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-slate-700">
            <span className="text-indigo-600">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            .zip or .7z up to any size
          </p>
        </div>
      </div>
      <input
        type="file"
        accept=".zip,.7z"
        onChange={onFileChange}
        disabled={disabled}
        className="hidden"
      />
    </label>
  );
}

/* ─────────────────────────── Main Component ─────────────────────────── */

export default function DashboardPage() {
  const fotaHistoryColumns = FotaHistoryColumns();

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
      const stored = localStorage.getItem("fota_server_id");
      return stored ? Number(stored) : 1;
    },
  );

  const [fotaPage, setFotaPage] = useState<number>(1);
  const [fotaPageSize, setFotaPageSize] = useState<number>(10);

  const [deviceZipFile, setDeviceZipFile] = useState<File | null>(null);
  const [webZipFile, setWebZipFile] = useState<File | null>(null);
  const [fotaZipFile, setFotaZipFile] = useState<File | null>(null);

  const [dragActiveZone, setDragActiveZone] = useState<string | null>(null);

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

  const devicesList: DeviceListItem[] = devicesData?.list ?? [];

  useEffect(() => {
    if (isDevicesError) {
      toast.error((devicesError as Error)?.message || "Failed to load devices");
    }
  }, [isDevicesError, devicesError]);

  // Latest record only — used to populate the "current" version fields.
  const {
    data: fotaDetailsData,
    isFetching: isFotaDetailsFetching,
    isError: isFotaDetailsError,
  } = useQuery({
    queryKey: ["fota-latest", fotaForm.device_id],
    queryFn: async () => {
      const result = await getFotaDetailsForDevice(fotaForm.device_id);
      return result?.data;
    },
    enabled: fotaForm.device_id > 0,
    retry: false,
  });

  useEffect(() => {
    const latest = fotaDetailsData?.fotaDetails;
    if (!latest) return;
    setFotaForm((prev) => ({
      ...prev,
      device_old_version:
        latest.deviceNewVersion ?? latest.deviceOldVersion ?? "",
      web_old_version: latest.webNewVersion ?? latest.webOldVersion ?? "",
      fota_old_version: latest.fotaNewVersion ?? latest.fotaOldVersion ?? "",
    }));
  }, [fotaDetailsData]);

  useEffect(() => {
    if (!isFotaDetailsError || fotaForm.device_id === 0) return;
    setFotaForm((prev) => ({
      ...prev,
      device_old_version: "",
      web_old_version: "",
      fota_old_version: "",
    }));
  }, [isFotaDetailsError]);

  // Full history — used to feed the update history table.
  const {
    data: fotaListDetails,
    isFetching: isFotaDetailsListFetching,
    isError: isFotaListError,
  } = useQuery({
    queryKey: ["fota-list", fotaForm.device_id, fotaPage, fotaPageSize],
    queryFn: async () => {
      const result = await getFotaList(fotaForm.device_id, {
        page: fotaPage,
        page_size: fotaPageSize,
      });
      return result?.data;
    },
    enabled: !!fotaForm.device_id,
    staleTime: 30000,
    retry: false,
  });

  const fotaHistory: FotaDetailsRow[] = fotaListDetails?.fotaDetails ?? [];
  const fotaPagination = fotaListDetails?.paginationDetails;

  const handleFotaTableDataChange = useCallback((params: any) => {
    const nextPage = Number(params?.page);
    const nextPageSize = Number(params?.page_size);
    if (!Number.isNaN(nextPage) && nextPage > 0) setFotaPage(nextPage);
    if (!Number.isNaN(nextPageSize) && nextPageSize > 0)
      setFotaPageSize(nextPageSize);
  }, []);

  useEffect(() => {
    if (isFotaListError) {
      toast.error("Failed to load update history");
    }
  }, [isFotaListError]);

  const { mutateAsync: addFotaForDevice } = useMutation({
    mutationKey: ["fota-details-submit"],
    mutationFn: async (payload: FormData) => {
      const result = await AddDetailsIntoFotaDb(payload);
      return result;
    },
  });

  /* ── Derived ── */
  const selectedDevice = useMemo(
    () => devicesList.find((d) => d.id === fotaForm.device_id) ?? null,
    [devicesList, fotaForm.device_id],
  );

  const hasAnyNewVersion = Boolean(
    fotaForm.device_new_version ||
    fotaForm.web_new_version ||
    fotaForm.fota_new_version,
  );
  const hasAnyFile = Boolean(deviceZipFile || webZipFile || fotaZipFile);
  const canSubmit = fotaForm.device_id > 0 && (hasAnyNewVersion || hasAnyFile);

  /* ── Handlers ── */
  const handleServerChange = (serverId: number) => {
    set_fota_update_server_id(serverId);
    localStorage.setItem("fota_server_id", String(serverId));
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
    localStorage.setItem("fota_server_id", String(fota_update_server_id));
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
    setFotaPage(1);
  };

  const handleVersionChange = (field: keyof FotaTextFields, value: string) => {
    setFotaForm((prev) => ({ ...prev, [field]: value }));
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
      toast.error("Please select a device first");
      return;
    }
    if (!hasAnyNewVersion && !hasAnyFile) {
      toast.error("Please provide at least one new version or upload a file");
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
    } catch (err) {
      toast.error("Failed to deploy FOTA update");
    }
  };

  /* ── Render ── */
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

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 hidden sm:inline">
              Environment
            </span>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => handleServerChange(1)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  fota_update_server_id === 1
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Production
              </button>
              <button
                onClick={() => handleServerChange(2)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  fota_update_server_id === 2
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Test
              </button>
            </div>
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
              <div className="flex items-center gap-3 mb-5">
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
                        : fotaForm.device_old_version || "—"}
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
                      placeholder="v1.2.0"
                      className="h-10 px-3 w-full bg-white border border-slate-200 rounded-lg text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Package Archive
                  </label>
                  <FileUploadZone
                    file={deviceZipFile}
                    onFileChange={handleFileChange(setDeviceZipFile)}
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
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                  <IconGlobe className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Web Application
                  </h3>
                  <p className="text-[11px] text-slate-500">Frontend bundle</p>
                </div>
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
                        : fotaForm.web_old_version || "—"}
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
                      disabled={!fotaForm.device_id}
                      placeholder="v2.0.0"
                      className="h-10 px-3 w-full bg-white border border-slate-200 rounded-lg text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Package Archive
                  </label>
                  <FileUploadZone
                    file={webZipFile}
                    onFileChange={handleFileChange(setWebZipFile)}
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
              <div className="flex items-center gap-3 mb-5">
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
                        : fotaForm.fota_old_version || "—"}
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
                      placeholder="v1.0.0"
                      className="h-10 px-3 w-full bg-white border border-slate-200 rounded-lg text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Package Archive
                  </label>
                  <FileUploadZone
                    file={fotaZipFile}
                    onFileChange={handleFileChange(setFotaZipFile)}
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

        {/* Update History Table */}
        {selectedDevice && (
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 pb-0">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Update History
              </h2>
              <p className="text-sm text-slate-500 mt-0.5 mb-4">
                Past FOTA deployments for this device
              </p>
            </div>
            <TanStackTable
              columns={fotaHistoryColumns}
              data={fotaHistory}
              loading={isFotaDetailsListFetching}
              getData={handleFotaTableDataChange}
              paginationDetails={fotaPagination}
              page={fotaPage}
              page_size={fotaPageSize}
              noDataLabel="No update history for this device"
              heightClass="h-auto"
            />
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
