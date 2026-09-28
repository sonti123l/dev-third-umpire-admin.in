import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";

export type FotaHistoryRow = {
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
  proposedBy?: string | null;
  proposedByName?: string | null;
  completedAt?: string | null;
};

// deviceStatus / webStatus are three-state: 0 = pending (not yet
// attempted), 1 = success (set by /:fotaId/update-fota-status when the
// device reports success), -1 = failed (device reported failure).
const StatusPill = ({ value }: { value: number }) => {
  if (value === 1) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Success
      </span>
    );
  }
  if (value === -1) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-rose-50 text-rose-700 border-rose-200">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-amber-50 text-amber-700 border-amber-200">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      Pending
    </span>
  );
};

const VersionCell = ({ oldV, newV }: { oldV: string; newV: string }) => {
  if (!oldV && !newV) return <span className="text-slate-300">—</span>;
  if (!oldV || oldV === newV) {
    return (
      <span className="font-mono text-xs text-slate-700">{newV || oldV}</span>
    );
  }
  return (
    <span className="font-mono text-xs text-slate-700">
      {oldV} <span className="text-slate-300">→</span> {newV}
    </span>
  );
};

const FotaHistoryColumns = () => {
  const columnHelper = createColumnHelper<FotaHistoryRow>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      size: 70,
      cell: (info) => (
        <span className="text-xs font-mono font-semibold text-slate-700">
          #{info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("deviceOldVersion", {
      id: "device_version",
      header: "Device",
      size: 160,
      cell: (info) => (
        <VersionCell
          oldV={info.row.original.deviceOldVersion}
          newV={info.row.original.deviceNewVersion}
        />
      ),
    }),
    columnHelper.accessor("webOldVersion", {
      id: "web_version",
      header: "Web",
      size: 160,
      cell: (info) => (
        <VersionCell
          oldV={info.row.original.webOldVersion}
          newV={info.row.original.webNewVersion}
        />
      ),
    }),
    columnHelper.accessor("fotaOldVersion", {
      id: "fota_version",
      header: "FOTA",
      size: 160,
      cell: (info) => (
        <VersionCell
          oldV={info.row.original.fotaOldVersion}
          newV={info.row.original.fotaNewVersion}
        />
      ),
    }),
    columnHelper.accessor("deviceStatus", {
      header: "Device Status",
      size: 130,
      cell: (info) => <StatusPill value={info.getValue()} />,
    }),
    columnHelper.accessor("webStatus", {
      header: "Web Status",
      size: 130,
      cell: (info) => <StatusPill value={info.getValue()} />,
    }),
    columnHelper.accessor("fotaStatus", {
      header: "FOTA Status",
      size: 130,
      cell: (info) => {
        const value = info.getValue();
        if (!value) return <span className="text-slate-300 text-xs">—</span>;
        return (
          <span className="text-xs font-semibold text-indigo-600">{value}</span>
        );
      },
    }),
    columnHelper.accessor("proposedBy", {
      header: "Proposed By",
      size: 210,
      cell: (info) => {
        const email = info.getValue();
        const name = info.row.original.proposedByName;
        if (!email && !name) return <span className="text-slate-300 text-xs">—</span>;
        return (
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-800">
              {name || email}
            </span>
            {name && email && (
              <span className="text-[10px] text-slate-400 font-mono">
                {email}
              </span>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      size: 180,
      cell: (info) => {
        const value = info.getValue();
        if (!value) return <span className="text-slate-300 text-xs">—</span>;
        return (
          <span className="text-xs text-slate-600">
            {dayjs(value).format("MMM D, YYYY h:mm A")}
          </span>
        );
      },
    }),
  ];

  return columns;
};

export default FotaHistoryColumns;
