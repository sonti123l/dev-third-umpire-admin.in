import { r as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { r as useAuth } from "./AuthContext-tqDdUJGP.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getDevicesDetails, r as getFotaDetailsForDevice, t as AddDetailsIntoFotaDb } from "./dashboardService-BsvHuNoD.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DashboardPage-BpbvBIJl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ALLOWED_ARCHIVE_EXTENSIONS = [".zip", ".7z"];
var IconServer = ({ className = "w-5 h-5" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
	})
});
var IconChip = ({ className = "w-5 h-5" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
	})
});
var IconGlobe = ({ className = "w-5 h-5" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
	})
});
var IconRefresh = ({ className = "w-5 h-5" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
	})
});
var IconUpload = ({ className = "w-5 h-5" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
	})
});
var IconArrow = ({ className = "w-5 h-5" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M13 7l5 5m0 0l-5 5m5-5H6"
	})
});
var IconX = ({ className = "w-4 h-4" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		d: "M6 18L18 6M6 6l12 12"
	})
});
var IconCheck = ({ className = "w-4 h-4" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		d: "M5 13l4 4L19 7"
	})
});
var IconChevron = ({ className = "w-4 h-4" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		d: "M19 9l-7 7-7-7"
	})
});
var IconActivity = ({ className = "w-5 h-5" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M13 10V3L4 14h7v7l9-11h-7z"
	})
});
var IconHardDrive = ({ className = "w-4 h-4" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
	})
});
var IconClock = ({ className = "w-4 h-4" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
	})
});
var IconSignal = ({ className = "w-4 h-4" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
	})
});
var IconLogout = ({ className = "w-4 h-4" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.5,
		d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
	})
});
function formatBytes(bytes) {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
function formatDate(dateStr) {
	if (!dateStr) return "—";
	return new Date(dateStr.endsWith("Z") ? dateStr : dateStr + "Z").toLocaleString("en-IN", {
		timeZone: "Asia/Kolkata",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true
	});
}
function StatusBadge({ status }) {
	const isOnline = status?.toLowerCase() === "online";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${isOnline ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-500" : "bg-amber-500"}` }), status || "Unknown"]
	});
}
function TrackStatusPill({ value }) {
	if (value === 1 || value === "APPLIED" || value === "SUCCESS") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }), "Success"]
	});
	if (value === -1 || value === "FAILED") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500" }), "Failed"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-400" }), typeof value === "string" && value ? value : "Pending"]
	});
}
function FileUploadZone({ file, onFileChange, disabled, label, dragActive, onDrag }) {
	const handleDragOver = (e) => {
		e.preventDefault();
		onDrag(true);
	};
	const handleDragLeave = (e) => {
		e.preventDefault();
		onDrag(false);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		onDrag(false);
		const dropped = e.dataTransfer.files?.[0];
		if (!dropped) return;
		const name = dropped.name.toLowerCase();
		if (!ALLOWED_ARCHIVE_EXTENSIONS.some((ext) => name.endsWith(ext))) {
			toast.error("Please drop a .zip or .7z file");
			return;
		}
		const dt = new DataTransfer();
		dt.items.add(dropped);
		onFileChange({ target: { files: dt.files } });
	};
	if (file) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconUpload, { className: "w-4 h-4 text-indigo-600" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-slate-900 truncate",
					children: file.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-500",
					children: formatBytes(file.size)
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => onFileChange({ target: { files: null } }),
			className: "p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-600",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, {})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		onDragOver: handleDragOver,
		onDragLeave: handleDragLeave,
		onDrop: handleDrop,
		className: `flex flex-col items-center justify-center w-full h-28 rounded-xl border-2 border-dashed transition-all cursor-pointer ${disabled ? "bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed" : dragActive ? "bg-indigo-50 border-indigo-400" : "bg-slate-50/50 border-slate-300 hover:border-slate-400 hover:bg-slate-50"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2 rounded-lg transition-colors ${dragActive ? "bg-indigo-100" : "bg-slate-100"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconUpload, { className: `w-5 h-5 ${dragActive ? "text-indigo-600" : "text-slate-400"}` })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium text-slate-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-indigo-600",
						children: "Click to upload"
					}), " or drag and drop"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-slate-400 mt-0.5",
					children: ".zip or .7z up to any size"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "file",
			accept: ".zip,.7z",
			onChange: onFileChange,
			disabled,
			className: "hidden"
		})]
	});
}
function DashboardPage() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [fotaForm, setFotaForm] = (0, import_react.useState)({
		device_id: 0,
		device_old_version: "",
		device_new_version: "",
		web_old_version: "",
		web_new_version: "",
		fota_old_version: "",
		fota_new_version: ""
	});
	const [fota_update_server_id, set_fota_update_server_id] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return 1;
		const stored = localStorage.getItem("fota_server_id");
		return stored && stored !== "3" ? Number(stored) : 1;
	});
	const handleLogout = async () => {
		try {
			await logout();
			toast.success("Logged out successfully");
			navigate({ to: "/login" });
		} catch {
			toast.error("Logout failed");
		}
	};
	const [deviceZipFile, setDeviceZipFile] = (0, import_react.useState)(null);
	const [webZipFile, setWebZipFile] = (0, import_react.useState)(null);
	const [fotaZipFile, setFotaZipFile] = (0, import_react.useState)(null);
	const [dragActiveZone, setDragActiveZone] = (0, import_react.useState)(null);
	const { data: devicesData, isLoading: isDevicesLoading, isError: isDevicesError, error: devicesError } = useQuery({
		queryKey: ["devices", fota_update_server_id],
		queryFn: async () => {
			return (await getDevicesDetails())?.data;
		},
		enabled: !!fota_update_server_id,
		staleTime: 6e4,
		refetchOnWindowFocus: true
	});
	const devicesList = devicesData?.list ?? [];
	(0, import_react.useEffect)(() => {
		if (isDevicesError) toast.error(devicesError?.message || "Failed to load devices");
	}, [isDevicesError, devicesError]);
	const handleGetDeviceHardWareUUid = (id) => {
		return devicesList.filter((eachDevice) => eachDevice.id === id)[0]?.hardwareUuid;
	};
	const { data: fotaDetailsData, isFetching: isFotaDetailsFetching, isError: isFotaDetailsError } = useQuery({
		queryKey: ["fota-latest", fotaForm.device_id],
		queryFn: async () => {
			return (await getFotaDetailsForDevice(handleGetDeviceHardWareUUid(fotaForm.device_id)))?.data;
		},
		enabled: fotaForm.device_id > 0,
		retry: false
	});
	const latestFotaRecord = fotaDetailsData?.fotaDetails ?? null;
	(0, import_react.useEffect)(() => {
		if (!latestFotaRecord) return;
		setFotaForm((prev) => ({
			...prev,
			device_old_version: latestFotaRecord.deviceNewVersion ?? latestFotaRecord.deviceOldVersion ?? "",
			web_old_version: latestFotaRecord.webNewVersion ?? latestFotaRecord.webOldVersion ?? "",
			fota_old_version: latestFotaRecord.fotaNewVersion ?? latestFotaRecord.fotaOldVersion ?? ""
		}));
	}, [latestFotaRecord]);
	(0, import_react.useEffect)(() => {
		if (!isFotaDetailsError || fotaForm.device_id === 0) return;
		setFotaForm((prev) => ({
			...prev,
			device_old_version: "",
			web_old_version: "",
			fota_old_version: ""
		}));
	}, [isFotaDetailsError]);
	const { mutateAsync: addFotaForDevice } = useMutation({
		mutationKey: ["fota-details-submit"],
		mutationFn: async (payload) => {
			return await AddDetailsIntoFotaDb(payload);
		}
	});
	const selectedDevice = (0, import_react.useMemo)(() => devicesList.find((d) => d.id === fotaForm.device_id) ?? null, [devicesList, fotaForm.device_id]);
	const hasAnyNewVersion = Boolean(fotaForm.device_new_version || fotaForm.web_new_version || fotaForm.fota_new_version);
	const hasAnyFile = Boolean(deviceZipFile || webZipFile || fotaZipFile);
	let canSubmit = fotaForm.device_id > 0 && (hasAnyNewVersion || hasAnyFile);
	const handleServerChange = (serverId) => {
		set_fota_update_server_id(serverId);
		if (typeof window !== "undefined") localStorage.setItem("fota_server_id", String(serverId));
		setFotaForm((prev) => ({
			...prev,
			device_id: 0,
			device_old_version: "",
			web_old_version: "",
			fota_old_version: ""
		}));
		setDeviceZipFile(null);
		setWebZipFile(null);
		setFotaZipFile(null);
	};
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") localStorage.setItem("fota_server_id", String(fota_update_server_id));
	}, [fota_update_server_id]);
	const handleDeviceChange = (deviceId) => {
		setFotaForm((prev) => ({
			...prev,
			device_id: deviceId,
			device_old_version: "",
			web_old_version: "",
			fota_old_version: "",
			device_new_version: "",
			web_new_version: "",
			fota_new_version: ""
		}));
		setDeviceZipFile(null);
		setWebZipFile(null);
		setFotaZipFile(null);
	};
	const handleVersionChange = (field, value) => {
		if (fotaForm.device_old_version == value || fotaForm.web_old_version == value) canSubmit = false;
		else setFotaForm((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const handleFileChange = (setter) => (e) => {
		const file = e.target.files?.[0] ?? null;
		const fileName = file?.name.toLowerCase() ?? "";
		const isAllowed = ALLOWED_ARCHIVE_EXTENSIONS.some((ext) => fileName.endsWith(ext));
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
		if (user?.id) formData.append("user_id", String(user.id));
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
			setFotaForm((prev) => ({
				...prev,
				device_new_version: "",
				web_new_version: "",
				fota_new_version: ""
			}));
			setDeviceZipFile(null);
			setWebZipFile(null);
			setFotaZipFile(null);
		} catch (err) {
			toast.error("Failed to deploy FOTA update");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-50 text-slate-900",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "bg-white border-b border-slate-200 sticky top-0 z-30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm shadow-indigo-200",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconActivity, { className: "w-5 h-5 text-white" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-base font-bold text-slate-900 leading-tight tracking-tight",
							children: "FOTA Manager"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-500 font-medium",
							children: "Firmware Over-The-Air Deployment"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-slate-500 hidden md:inline",
								children: "Environment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex bg-slate-100 p-1 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleServerChange(1),
									className: `px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${fota_update_server_id === 1 ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
									children: "Production"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleServerChange(2),
									className: `px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${fota_update_server_id === 2 ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
									children: "Test"
								})]
							})]
						}), user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 pl-2 border-l border-slate-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col text-right hidden sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-slate-800 leading-tight",
									children: user.name || user.email.split("@")[0]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-indigo-600 font-semibold uppercase tracking-wider",
									children: user.role || "FOTA Manager"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleLogout,
								className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all border border-rose-200 shadow-sm",
								title: "Log out of FOTA Manager",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLogout, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Logout"
								})]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-bold text-slate-900 uppercase tracking-wider",
									children: "Target Device"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate-500 mt-0.5",
									children: "Select a device to inspect current versions and prepare deployment"
								})] }), selectedDevice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selectedDevice.status })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lg:col-span-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-slate-700 mb-2",
										children: "Select Device"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: fotaForm.device_id,
											onChange: (e) => handleDeviceChange(Number(e.target.value)),
											disabled: isDevicesLoading || devicesList.length === 0,
											className: "w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 0,
												disabled: true,
												children: isDevicesLoading ? "Loading devices..." : devicesList.length === 0 ? "No devices available" : "Choose a device..."
											}), devicesList.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: device.id,
												children: device.name ? `${device.name}  ·  #${device.id}` : `Device #${device.id}`
											}, device.id))]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevron, {})
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-8",
									children: selectedDevice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-slate-50 rounded-xl p-3.5 border border-slate-100",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 mb-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconHardDrive, { className: "w-3.5 h-3.5 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
														children: "Hardware UUID"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-mono font-medium text-slate-700 truncate",
													title: selectedDevice.hardwareUuid,
													children: selectedDevice.hardwareUuid
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-slate-50 rounded-xl p-3.5 border border-slate-100",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 mb-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconClock, { className: "w-3.5 h-3.5 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
														children: "Last Heartbeat"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-medium text-slate-700",
													children: formatDate(selectedDevice.lastHeartbeat)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-slate-50 rounded-xl p-3.5 border border-slate-100",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 mb-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSignal, { className: "w-3.5 h-3.5 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
														children: "Current Firmware"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-medium text-slate-700",
													children: selectedDevice.firmwareVersion || fotaForm.device_old_version || "UNKNOWN"
												})]
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "h-full min-h-[96px] flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mb-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChip, { className: "w-4 h-4 text-slate-300" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-400 font-medium",
											children: "Select a device to view telemetry"
										})]
									})
								})]
							})]
						}), selectedDevice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50/80 border-t border-slate-100 px-6 py-3 flex flex-wrap items-center gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
										children: "Device"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200",
										children: fotaForm.device_old_version || "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
										children: "Web"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200",
										children: fotaForm.web_old_version || "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
										children: "FOTA"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200",
										children: fotaForm.fota_old_version || "—"
									})]
								}),
								isFotaDetailsFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-indigo-600 font-medium animate-pulse ml-auto",
									children: "Fetching latest versions..."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 xl:grid-cols-3 gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-indigo-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-5 flex-1 flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 mb-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChip, { className: "w-5 h-5 text-indigo-600" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-bold text-slate-900",
											children: "Device Firmware"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-500",
											children: "Core system package"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-[1fr_auto_1fr] gap-2 items-end",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5",
													children: "Current"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `h-10 px-3 flex items-center rounded-lg border text-sm font-mono font-medium ${isFotaDetailsFetching ? "bg-indigo-50/50 border-indigo-100 text-indigo-400 animate-pulse" : "bg-slate-50 border-slate-200 text-slate-600"}`,
													children: isFotaDetailsFetching ? "Loading..." : fotaForm.device_old_version || "—"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pb-2.5 text-slate-300",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrow, { className: "w-4 h-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5",
														children: "New"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: fotaForm.device_new_version,
														onChange: (e) => handleVersionChange("device_new_version", e.target.value),
														disabled: !fotaForm.device_id,
														placeholder: "v1.2.0",
														className: "h-10 px-3 w-full bg-white border border-slate-200 rounded-lg text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
													}),
													fotaForm.device_new_version && fotaForm.device_old_version == fotaForm.device_new_version ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-red-600 text-sm font-mono font-medium",
														children: "New version cannot be the same as the old version."
													}) : null
												] })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5",
											children: "Package Archive"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadZone, {
											file: deviceZipFile,
											onFileChange: handleFileChange(setDeviceZipFile),
											disabled: !fotaForm.device_id,
											label: "device",
											dragActive: dragActiveZone === "device",
											onDrag: (active) => setDragActiveZone(active ? "device" : null)
										})] })]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-sky-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-5 flex-1 flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 mb-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGlobe, { className: "w-5 h-5 text-sky-600" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-bold text-slate-900",
											children: "Web Application"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-500",
											children: "Frontend bundle"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-[1fr_auto_1fr] gap-2 items-end",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5",
													children: "Current"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `h-10 px-3 flex items-center rounded-lg border text-sm font-mono font-medium ${isFotaDetailsFetching ? "bg-sky-50/50 border-sky-100 text-sky-400 animate-pulse" : "bg-slate-50 border-slate-200 text-slate-600"}`,
													children: isFotaDetailsFetching ? "Loading..." : fotaForm.web_old_version || "—"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pb-2.5 text-slate-300",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrow, { className: "w-4 h-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5",
														children: "New"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: fotaForm.web_new_version,
														onChange: (e) => handleVersionChange("web_new_version", e.target.value),
														disabled: !fotaForm.device_id,
														placeholder: "v2.0.0",
														className: "h-10 px-3 w-full bg-white border border-slate-200 rounded-lg text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
													}),
													fotaForm.web_new_version && fotaForm.web_old_version == fotaForm.web_new_version ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-red-600 text-sm font-mono font-medium",
														children: "New version cannot be the same as the old version."
													}) : null
												] })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5",
											children: "Package Archive"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadZone, {
											file: webZipFile,
											onFileChange: handleFileChange(setWebZipFile),
											disabled: !fotaForm.device_id,
											label: "web",
											dragActive: dragActiveZone === "web",
											onDrag: (active) => setDragActiveZone(active ? "web" : null)
										})] })]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-violet-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-5 flex-1 flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 mb-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRefresh, { className: "w-5 h-5 text-violet-600" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-bold text-slate-900",
											children: "FOTA Updater"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-500",
											children: "Updater agent package"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-[1fr_auto_1fr] gap-2 items-end",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5",
													children: "Current"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `h-10 px-3 flex items-center rounded-lg border text-sm font-mono font-medium ${isFotaDetailsFetching ? "bg-violet-50/50 border-violet-100 text-violet-400 animate-pulse" : "bg-slate-50 border-slate-200 text-slate-600"}`,
													children: isFotaDetailsFetching ? "Loading..." : fotaForm.fota_old_version || "—"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pb-2.5 text-slate-300",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrow, { className: "w-4 h-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5",
													children: "New"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: fotaForm.fota_new_version,
													onChange: (e) => handleVersionChange("fota_new_version", e.target.value),
													disabled: !fotaForm.device_id,
													placeholder: "v1.0.0",
													className: "h-10 px-3 w-full bg-white border border-slate-200 rounded-lg text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
												})] })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5",
											children: "Package Archive"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadZone, {
											file: fotaZipFile,
											onFileChange: handleFileChange(setFotaZipFile),
											disabled: !fotaForm.device_id,
											label: "fota",
											dragActive: dragActiveZone === "fota",
											onDrag: (active) => setDragActiveZone(active ? "fota" : null)
										})] })]
									})]
								})]
							})
						]
					}),
					selectedDevice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconClock, { className: "w-5 h-5 text-indigo-600" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-bold text-slate-900 uppercase tracking-wider",
										children: "Latest Deployment Record"
									}), latestFotaRecord?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-mono font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100",
										children: ["#", latestFotaRecord.id]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-500 mt-0.5",
									children: "Most recent firmware, web, and updater release for this device"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => navigate({ to: `/${fotaForm.device_id}/fota-information` }),
								className: "inline-flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 hover:border-indigo-200 transition-all shadow-sm active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Full History" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrow, { className: "w-3.5 h-3.5 text-indigo-600" })]
							})]
						}), latestFotaRecord ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-3 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl border border-slate-100 bg-slate-50/70",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider",
													children: "Device Firmware"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackStatusPill, { value: latestFotaRecord.deviceStatus })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline gap-2 mb-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-mono font-semibold text-slate-800",
														children: latestFotaRecord.deviceOldVersion || "—"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-400 text-xs",
														children: "→"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-mono font-bold text-indigo-600",
														children: latestFotaRecord.deviceNewVersion || "—"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] text-slate-500 truncate",
												title: latestFotaRecord.deviceFotaUrl || "No archive",
												children: [
													"Package:",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-slate-700",
														children: latestFotaRecord.deviceFotaUrl || "None"
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl border border-slate-100 bg-slate-50/70",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider",
													children: "Web Application"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackStatusPill, { value: latestFotaRecord.webStatus })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline gap-2 mb-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-mono font-semibold text-slate-800",
														children: latestFotaRecord.webOldVersion || "—"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-400 text-xs",
														children: "→"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-mono font-bold text-sky-600",
														children: latestFotaRecord.webNewVersion || "—"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] text-slate-500 truncate",
												title: latestFotaRecord.webFotaUrl || "No archive",
												children: [
													"Package:",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-slate-700",
														children: latestFotaRecord.webFotaUrl || "None"
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl border border-slate-100 bg-slate-50/70",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider",
													children: "FOTA Updater"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackStatusPill, { value: latestFotaRecord.fotaStatus })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline gap-2 mb-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-mono font-semibold text-slate-800",
														children: latestFotaRecord.fotaOldVersion || "—"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-400 text-xs",
														children: "→"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-mono font-bold text-violet-600",
														children: latestFotaRecord.fotaNewVersion || "—"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] text-slate-500 truncate",
												title: latestFotaRecord.fotaUpdateUrl || "No archive",
												children: [
													"Package:",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-slate-700",
														children: latestFotaRecord.fotaUpdateUrl || "None"
													})
												]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Last Deployed:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-slate-700",
										children: formatDate(latestFotaRecord.createdAt)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => navigate({ to: `/${fotaForm.device_id}/fota-information` }),
									className: "text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View all previous updates in history table" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrow, { className: "w-3.5 h-3.5" })]
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-8 text-center bg-slate-50/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-slate-600",
								children: "No previous FOTA deployments recorded for this device."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mt-1",
								children: "Configure versions and upload package archives above to deploy the initial release."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "bg-white rounded-2xl border border-slate-200 shadow-sm p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${canSubmit ? "bg-indigo-50" : "bg-slate-100"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconServer, { className: `w-5 h-5 ${canSubmit ? "text-indigo-600" : "text-slate-400"}` })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold text-slate-900",
									children: "Deployment Summary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [fotaForm.device_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3.5 h-3.5 rounded-full border-2 border-slate-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xs font-medium ${fotaForm.device_id ? "text-slate-700" : "text-slate-400"}`,
												children: "Device selected"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [hasAnyNewVersion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3.5 h-3.5 rounded-full border-2 border-slate-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xs font-medium ${hasAnyNewVersion ? "text-slate-700" : "text-slate-400"}`,
												children: "Version defined"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [hasAnyFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3.5 h-3.5 rounded-full border-2 border-slate-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xs font-medium ${hasAnyFile ? "text-slate-700" : "text-slate-400"}`,
												children: "File attached"
											})]
										})
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSubmit,
								disabled: !canSubmit,
								className: `flex items-center justify-center gap-2 px-6 h-11 rounded-xl text-sm font-bold transition-all duration-200 min-w-[180px] ${canSubmit ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-sm shadow-indigo-200" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRefresh, { className: "w-4 h-4" }), "Deploy FOTA Update"]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12" })
		]
	});
}
//#endregion
export { DashboardPage as t };
