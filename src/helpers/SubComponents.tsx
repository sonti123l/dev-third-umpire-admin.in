import { IconUpload, IconX } from "@/icons/icons";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

const ALLOWED_ARCHIVE_EXTENSIONS = [".zip", ".7z"];

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
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

function TrackStatusPill({
  value,
}: {
  value: number | string | null | undefined;
}) {
  if (value === 1 || value === "APPLIED" || value === "SUCCESS") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Success
      </span>
    );
  }
  if (value === -1 || value === "FAILED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      {typeof value === "string" && value ? value : "Pending"}
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
      <>
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                <IconUpload className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {formatBytes(file.size)}
                </p>
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
      </>
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

export default FileUploadZone;

export { TrackStatusPill, StatusBadge, formatDate };
