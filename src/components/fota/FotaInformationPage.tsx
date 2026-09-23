import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getDevicesDetails,
  getFotaList,
} from "@/services/dashboardservice/dashboardService";
import TanStackTable from "@/components/core/TanstackTable";
import FotaHistoryColumns, { FotaHistoryRow } from "@/helpers/FotaHistoryColumns";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { toast } from "sonner";

/* ─────────────────────────── Icons ─────────────────────────── */

const IconArrowLeft = ({ className = "w-4 h-4" }: { className?: string }) => (
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
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const IconHistory = ({ className = "w-5 h-5" }: { className?: string }) => (
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

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
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

/* ─────────────────────────── Main Component ─────────────────────────── */

export default function FotaInformationPage() {
  const params = useParams({ strict: false }) as { deviceId?: string };
  const deviceIdParam = params?.deviceId || "";
  const navigate = useNavigate();

  const [fotaPage, setFotaPage] = useState<number>(1);
  const [fotaPageSize, setFotaPageSize] = useState<number>(10);

  const fotaHistoryColumns = FotaHistoryColumns();

  // Fetch device details
  const { data: devicesData, isLoading: isDevicesLoading } = useQuery({
    queryKey: ["devices-info"],
    queryFn: async () => {
      const result = await getDevicesDetails();
      return result?.data;
    },
    staleTime: 60000,
  });

  const devicesList: any[] = (devicesData as any)?.list ?? [];

  // Match selected device by numeric ID or hardware UUID
  const selectedDevice = useMemo(() => {
    if (!deviceIdParam || devicesList.length === 0) return null;
    const numId = parseInt(deviceIdParam);
    return (
      devicesList.find((d) => d.id === numId || d.hardwareUuid === deviceIdParam) ??
      null
    );
  }, [devicesList, deviceIdParam]);

  // Lookup key for API: prefer hardware UUID if device found, or fallback to deviceIdParam
  const queryDeviceIdentifier = selectedDevice?.hardwareUuid || deviceIdParam;

  // Fetch complete FOTA history for this device
  const {
    data: fotaListDetails,
    isFetching: isFotaDetailsListFetching,
    isError: isFotaListError,
  } = useQuery({
    queryKey: ["fota-list-page", queryDeviceIdentifier, fotaPage, fotaPageSize],
    queryFn: async () => {
      const result = await getFotaList(queryDeviceIdentifier, {
        page: fotaPage,
        page_size: fotaPageSize,
      });
      return result?.data;
    },
    enabled: !!queryDeviceIdentifier,
    staleTime: 30000,
    retry: false,
  });

  useEffect(() => {
    if (isFotaListError) {
      toast.error("Failed to load update history for this device");
    }
  }, [isFotaListError]);

  const fotaHistory: FotaHistoryRow[] =
    (fotaListDetails as any)?.fotaDetails ?? [];
  const fotaPagination = (fotaListDetails as any)?.paginationDetails ?? {};

  const handleFotaTableDataChange = useCallback((tableParams: any) => {
    const nextPage = Number(tableParams?.page);
    const nextPageSize = Number(tableParams?.page_size);
    if (!Number.isNaN(nextPage) && nextPage > 0) setFotaPage(nextPage);
    if (!Number.isNaN(nextPageSize) && nextPageSize > 0)
      setFotaPageSize(nextPageSize);
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Navigation Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate({ to: "/" })}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
              >
                <IconArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <IconHistory className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-slate-900 leading-tight">
                    FOTA Deployment History
                  </h1>
                  <p className="text-[11px] text-slate-500">
                    Device #{deviceIdParam}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Device Overview Banner */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    {selectedDevice?.name || `Device #${deviceIdParam}`}
                  </h2>
                  {selectedDevice && <StatusBadge status={selectedDevice.status} />}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete historical record of firmware, web, and updater deployments
                </p>
              </div>
            </div>

            {selectedDevice && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <IconHardDrive className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Hardware UUID
                    </span>
                  </div>
                  <p className="text-sm font-mono font-medium text-slate-700 truncate">
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
                      Active Firmware
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    {selectedDevice.firmwareVersion ||
                      selectedDevice.deviceVersion ||
                      "UNKNOWN"}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Full History Table */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 pb-0 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Update Logs
                </h3>
                <p className="text-sm text-slate-500 mt-0.5 mb-4">
                  All past FOTA deployments executed for this device
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                {fotaHistory.length} Record{fotaHistory.length === 1 ? "" : "s"}
              </span>
            </div>

            <TanStackTable
              columns={fotaHistoryColumns}
              data={fotaHistory}
              loading={isFotaDetailsListFetching || isDevicesLoading}
              getData={handleFotaTableDataChange}
              paginationDetails={fotaPagination}
              page={fotaPage}
              page_size={fotaPageSize}
              noDataLabel="No past update history found for this device"
              heightClass="h-auto"
            />
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}
