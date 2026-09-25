import { r as __toESM } from "../_runtime.mjs";
import { a as SelectItem$1, c as SelectPositioner, d as SelectValue$1, f as SelectTrigger$1, h as Input, i as SelectItemIndicator, l as SelectPortal, m as Button, n as SelectScrollDownArrow, o as SelectList, p as SelectRoot, r as SelectItemText, s as SelectPopup, t as SelectScrollUpArrow, u as SelectIcon, v as require_jsx_runtime, y as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { _ as useParams, g as useNavigate, l as useLocation, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AuthGuard } from "./AuthGuard-CC0DF2AS.mjs";
import { i as getFotaList, n as getDevicesDetails } from "./dashboardService-DFj4idLN.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as getFilteredRowModel, i as getCoreRowModel, n as useReactTable, o as getSortedRowModel, r as createColumnHelper, t as flexRender } from "../_libs/@tanstack/react-table+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as ChevronDown, i as ChevronLeft, n as ChevronUp, o as Check, r as ChevronRight, t as Ellipsis } from "../_libs/lucide-react.mjs";
import { t as require_dayjs_min } from "../_libs/dayjs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fota-information-CD7h0Fb2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Table({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			"data-slot": "table",
			className: cn("w-full caption-bottom text-sm", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
		"data-slot": "table-header",
		className: cn("[&_tr]:border-b", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", className),
		...props
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		"data-slot": "table-row",
		className: cn("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", className),
		...props
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		"data-slot": "table-head",
		className: cn("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		"data-slot": "table-cell",
		className: cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "skeleton",
		className: cn("animate-pulse rounded-md bg-muted", className),
		...props
	});
}
function Input$1({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		type,
		"data-slot": "input",
		className: cn("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Pagination({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		role: "navigation",
		"aria-label": "pagination",
		"data-slot": "pagination",
		className: cn("mx-auto flex w-full justify-center", className),
		...props
	});
}
function PaginationContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-slot": "pagination-content",
		className: cn("flex items-center gap-0.5", className),
		...props
	});
}
function PaginationItem({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-slot": "pagination-item",
		...props
	});
}
function PaginationLink({ className, isActive, size = "icon", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		variant: isActive ? "outline" : "ghost",
		size,
		className: cn(className),
		nativeButton: false,
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			"aria-current": isActive ? "page" : void 0,
			"data-slot": "pagination-link",
			"data-active": isActive,
			...props
		})
	});
}
function PaginationPrevious({ className, text = "Previous", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
		"aria-label": "Go to previous page",
		size: "default",
		className: cn("pl-1.5!", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { "data-icon": "inline-start" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:block",
			children: text
		})]
	});
}
function PaginationNext({ className, text = "Next", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
		"aria-label": "Go to next page",
		size: "default",
		className: cn("pr-1.5!", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:block",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { "data-icon": "inline-end" })]
	});
}
function PaginationEllipsis({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"aria-hidden": true,
		"data-slot": "pagination-ellipsis",
		className: cn("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "More pages"
		})]
	});
}
var Select$1 = SelectRoot;
function SelectValue({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue$1, {
		"data-slot": "select-value",
		className: cn("flex flex-1 text-left", className),
		...props
	});
}
function SelectTrigger({ className, size = "default", children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		"data-slot": "select-trigger",
		"data-size": size,
		className: cn("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function SelectContent({ className, children, side = "bottom", sideOffset = 4, align = "center", alignOffset = 0, alignItemWithTrigger = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPositioner, {
		side,
		sideOffset,
		align,
		alignOffset,
		alignItemWithTrigger,
		className: "isolate z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectPopup, {
			"data-slot": "select-content",
			"data-align-trigger": alignItemWithTrigger,
			className: cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectList, { children }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
			]
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		"data-slot": "select-item",
		className: cn("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, {
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "pointer-events-none" })
		})]
	});
}
function SelectScrollUpButton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpArrow, {
		"data-slot": "select-scroll-up-button",
		className: cn("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {})
	});
}
function SelectScrollDownButton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownArrow, {
		"data-slot": "select-scroll-down-button",
		className: cn("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {})
	});
}
var PaginationComponent = ({ capturePageNum, captureRowPerItems, initialPage = 1, limitOptionsFromProps = [], paginationDetails }) => {
	const [currentPage, setCurrentPage] = (0, import_react.useState)(initialPage);
	const [inputPageValue, setInputPageValue] = (0, import_react.useState)(initialPage.toString());
	const [limitOptions, setLimitOptions] = (0, import_react.useState)([]);
	const totalPages = paginationDetails?.total_pages ?? 1;
	const selectedValue = paginationDetails?.page_size ?? 15;
	const totalRecords = paginationDetails?.total_records ?? 0;
	const lastIndex = currentPage * selectedValue;
	const firstIndex = lastIndex - selectedValue;
	(0, import_react.useEffect)(() => {
		setLimitOptions(limitOptionsFromProps.length ? limitOptionsFromProps : [
			{
				title: "10/page",
				value: 10
			},
			{
				title: "15/page",
				value: 15
			},
			{
				title: "25/page",
				value: 25
			},
			{
				title: "100/page",
				value: 100
			},
			{
				title: "250/page",
				value: 250
			},
			{
				title: "500/page",
				value: 500
			}
		]);
	}, [limitOptionsFromProps]);
	(0, import_react.useEffect)(() => {
		if (paginationDetails?.current_page) {
			setCurrentPage(paginationDetails.current_page);
			setInputPageValue(paginationDetails.current_page.toString());
		}
	}, [paginationDetails]);
	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			setInputPageValue(page.toString());
			capturePageNum(page);
		}
	};
	const handleRowChange = (newLimit) => {
		if (newLimit) captureRowPerItems(Number(newLimit));
	};
	const handleInputChange = (e) => {
		const value = e.target.value;
		if (value === "" || /^[0-9]+$/.test(value)) setInputPageValue(value);
	};
	const onKeyDownInPageChange = (e) => {
		if (e.key === "Enter") handlePageChange(Math.max(1, Math.min(parseInt(inputPageValue) || 1, totalPages)));
	};
	const getPageNumbers = () => {
		const pageNumbers = [];
		if (totalPages <= 5) for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
		else if (currentPage <= 3) {
			for (let i = 1; i <= 4; i++) pageNumbers.push(i);
			pageNumbers.push(null);
			pageNumbers.push(totalPages);
		} else if (currentPage >= totalPages - 2) {
			pageNumbers.push(1);
			pageNumbers.push(null);
			for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
		} else {
			pageNumbers.push(1);
			pageNumbers.push(null);
			for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
			pageNumbers.push(null);
			pageNumbers.push(totalPages);
		}
		return pageNumbers;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pagination, {
		className: "flex justify-between items-center px-2 sticky bottom-0 shadow-inner",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
			className: "px-1 py-0 flex gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
				value: selectedValue?.toString(),
				onValueChange: handleRowChange,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-24 text-xs py-0 h-6 border-gray-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
						placeholder: `Items per page`,
						className: "font-normal text-xs border-gray-200"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
					className: "w-[120px] text-xs bg-white pointer",
					children: limitOptions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: item.value?.toString(),
						className: "cursor-pointer font-normal text-xs opacity-90",
						children: item.title
					}, item.value))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-normal text-xs opacity-80",
				children: [
					Math.min(firstIndex + 1, totalRecords),
					" -",
					" ",
					Math.min(lastIndex, totalRecords),
					" of ",
					totalRecords
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationContent, {
				className: "px-1 py-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center font-normal text-xs opacity-80",
					children: ["GoTo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: inputPageValue,
						onChange: handleInputChange,
						onKeyDown: onKeyDownInPageChange,
						className: "h-6 w-10 text-center bg-gray-300 text-xs  ml-2",
						placeholder: "Page"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
				className: "px-1 py-0 font-normal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
						href: currentPage === 1 ? void 0 : "#",
						onClick: (e) => {
							e.preventDefault();
							if (currentPage > 1) handlePageChange(currentPage - 1);
						},
						"aria-disabled": currentPage === 1,
						className: currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
					}) }),
					getPageNumbers().map((pageNumber, index) => pageNumber === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationEllipsis, {}) }, `ellipsis-${index}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
						href: "#",
						isActive: pageNumber === currentPage,
						onClick: (e) => {
							e.preventDefault();
							handlePageChange(pageNumber);
						},
						className: `text-xs min-w-6 h-6 px-1.5 ${pageNumber === currentPage ? "bg-gray-300 rounded-full border-gray-200" : ""}`,
						children: pageNumber
					}) }, pageNumber)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
						href: currentPage === totalPages ? void 0 : "#",
						onClick: (e) => {
							e.preventDefault();
							if (currentPage < totalPages) handlePageChange(currentPage + 1);
						},
						"aria-disabled": currentPage === totalPages,
						className: currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
					}) })
				]
			})]
		})]
	});
};
var TanStackTable = ({ columns, data, loading = false, getData, paginationDetails, removeSortingForColumnIds, heightClass, noDataLabel, page, page_size }) => {
	const router = useRouter();
	const [sorting, setSorting] = (0, import_react.useState)([]);
	const location = useLocation();
	const searchParams = new URLSearchParams(location?.search);
	const table = useReactTable({
		columns,
		data: data?.length ? data : [],
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel()
	});
	const capturePageNum = (value) => {
		getData({
			...searchParams,
			page_size: searchParams.get("page_size") ? Number(searchParams.get("page_size")) : page_size,
			page: value,
			order_by: searchParams.get("order_by"),
			order_type: searchParams.get("order_type")
		});
	};
	const captureRowPerItems = (value) => {
		getData({
			...searchParams,
			page_size: value,
			page: 1,
			order_by: searchParams.get("order_by"),
			order_type: searchParams.get("order_type")
		});
	};
	const getWidth = (id) => {
		const widthObj = columns.find((col) => col.id === id);
		return widthObj ? widthObj?.width || widthObj?.size || "100px" : "100px";
	};
	const sortAndGetData = (header) => {
		if (removeSortingForColumnIds && removeSortingForColumnIds.length && removeSortingForColumnIds.includes(header.id)) return;
		let sortBy = header.id;
		let orderBy = `${sortBy}:asc`;
		if (searchParams.get("order_by")?.startsWith(header.id)) if (searchParams.get("order_by") === `${header.id}:asc`) orderBy = `${header.id}:desc`;
		else {
			sortBy = "";
			orderBy = "";
		}
		getData({
			...searchParams,
			page: 1,
			page_size: searchParams.get("page_size"),
			order_by: orderBy
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scrollbar overflow-x-auto  w-full ",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: ` overflow-auto scrollbar w-full relative  ease-in-out duration-300 transition-all ${heightClass ? heightClass : "h-auto"} [&>*:first-child]:h-full`,
			children: !data?.length && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full mt-[5%] justify-center items-center overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[20px] flex items-center h-full text-[#333] font-[400]",
					children: noDataLabel ? noDataLabel : "No data available"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[calc(100vh-180px)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						className: "sticky top-[0px] z-[1]  border-r-0",
						children: table?.getHeaderGroups()?.map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: headerGroup.headers.map((header, index) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								colSpan: header.colSpan,
								className: "bg-black",
								style: {
									minWidth: getWidth(header.id),
									width: getWidth(header.id),
									color: "#fff",
									fontWeight: "500"
								},
								children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `flex items-center gap-1 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`,
									onClick: () => sortAndGetData(header),
									style: {
										minWidth: getWidth(header.id),
										width: getWidth(header.id)
									},
									children: flexRender(header.column.columnDef.header, header.getContext())
								})
							}, index + `-${(/* @__PURE__ */ new Date()).getTime()}`);
						}) }, headerGroup.id + `-${(/* @__PURE__ */ new Date()).getTime()}`))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						className: "border-x",
						children: data?.length ? table?.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							className: "border-b-0 hover:bg-gray-300 even:bg-gray-100 transition-colors duration-200 ",
							...row?.original.issue_id && row?.id && !row?.original.service_type ? { onClick: () => router.navigate({ to: `/devices/${row.original.id}/info` }) } : {},
							children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "p-2 !bg-transparent",
								children: flexRender(cell.column.columnDef.cell, cell.getContext())
							}, cell.id + `-${(/* @__PURE__ */ new Date()).getTime()}`))
						}, row.id + `-${(/* @__PURE__ */ new Date()).getTime()}`)) : loading ? [...Array(25)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							className: "border-b-4   border-b-[#F8F8F8]",
							children: [...Array(columns.length)].map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "",
								children: j == 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 flex gap-2 items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-7 rounded-full bg-gray-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-3/5 bg-gray-200 rounded-none" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-3/5 bg-gray-200 rounded-none" })
								})
							}, `loading-cell-${i}-${j}`))
						}, `loading-row-${i}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
					})]
				})
			})
		}), data?.length && paginationDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationComponent, {
			paginationDetails,
			capturePageNum,
			captureRowPerItems
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: " " })]
	});
};
var StatusPill = ({ value }) => {
	if (value === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }), "Success"]
	});
	if (value === -1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-rose-50 text-rose-700 border-rose-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500" }), "Failed"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-slate-50 text-slate-500 border-slate-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-300" }), "Pending"]
	});
};
var VersionCell = ({ oldV, newV }) => {
	if (!oldV && !newV) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-slate-300",
		children: "—"
	});
	if (!oldV || oldV === newV) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-xs text-slate-700",
		children: newV || oldV
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "font-mono text-xs text-slate-700",
		children: [
			oldV,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-slate-300",
				children: "→"
			}),
			" ",
			newV
		]
	});
};
var FotaHistoryColumns = () => {
	const columnHelper = createColumnHelper();
	return [
		columnHelper.accessor("id", {
			header: "ID",
			size: 60,
			cell: (info) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs font-mono text-slate-500",
				children: ["#", info.getValue()]
			})
		}),
		columnHelper.accessor("deviceOldVersion", {
			id: "device_version",
			header: "Device",
			cell: (info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VersionCell, {
				oldV: info.row.original.deviceOldVersion,
				newV: info.row.original.deviceNewVersion
			})
		}),
		columnHelper.accessor("webOldVersion", {
			id: "web_version",
			header: "Web",
			cell: (info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VersionCell, {
				oldV: info.row.original.webOldVersion,
				newV: info.row.original.webNewVersion
			})
		}),
		columnHelper.accessor("fotaOldVersion", {
			id: "fota_version",
			header: "FOTA",
			cell: (info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VersionCell, {
				oldV: info.row.original.fotaOldVersion,
				newV: info.row.original.fotaNewVersion
			})
		}),
		columnHelper.accessor("deviceStatus", {
			header: "Device Status",
			cell: (info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { value: info.getValue() })
		}),
		columnHelper.accessor("webStatus", {
			header: "Web Status",
			cell: (info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { value: info.getValue() })
		}),
		columnHelper.accessor("fotaStatus", {
			header: "FOTA Status",
			cell: (info) => {
				const value = info.getValue();
				if (!value) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-slate-300 text-xs",
					children: "—"
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold text-indigo-600",
					children: value
				});
			}
		}),
		columnHelper.accessor("proposedBy", {
			header: "Proposed By",
			cell: (info) => {
				const email = info.getValue();
				const name = info.row.original.proposedByName;
				if (!email && !name) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-slate-300 text-xs",
					children: "—"
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-slate-800",
						children: name || email
					}), name && email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-slate-400 font-mono",
						children: email
					})]
				});
			}
		}),
		columnHelper.accessor("createdAt", {
			header: "Created At",
			cell: (info) => {
				const value = info.getValue();
				if (!value) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-slate-300 text-xs",
					children: "—"
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-slate-600",
					children: (0, import_dayjs_min.default)(value).format("MMM D, YYYY h:mm A")
				});
			}
		})
	];
};
var IconArrowLeft = ({ className = "w-4 h-4" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		d: "M10 19l-7-7m0 0l7-7m-7 7h18"
	})
});
var IconHistory = ({ className = "w-5 h-5" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
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
function FotaInformationPage() {
	const deviceIdParam = useParams({ strict: false })?.deviceId || "";
	const navigate = useNavigate();
	const [fotaPage, setFotaPage] = (0, import_react.useState)(1);
	const [fotaPageSize, setFotaPageSize] = (0, import_react.useState)(10);
	const fotaHistoryColumns = FotaHistoryColumns();
	const { data: devicesData, isLoading: isDevicesLoading } = useQuery({
		queryKey: ["devices-info"],
		queryFn: async () => {
			return (await getDevicesDetails())?.data;
		},
		staleTime: 6e4
	});
	const devicesList = devicesData?.list ?? [];
	const selectedDevice = (0, import_react.useMemo)(() => {
		if (!deviceIdParam || devicesList.length === 0) return null;
		const numId = parseInt(deviceIdParam);
		return devicesList.find((d) => d.id === numId || d.hardwareUuid === deviceIdParam) ?? null;
	}, [devicesList, deviceIdParam]);
	const queryDeviceIdentifier = selectedDevice?.hardwareUuid || deviceIdParam;
	const { data: fotaListDetails, isFetching: isFotaDetailsListFetching, isError: isFotaListError } = useQuery({
		queryKey: [
			"fota-list-page",
			queryDeviceIdentifier,
			fotaPage,
			fotaPageSize
		],
		queryFn: async () => {
			return (await getFotaList(queryDeviceIdentifier, {
				page: fotaPage,
				page_size: fotaPageSize
			}))?.data;
		},
		enabled: !!queryDeviceIdentifier,
		staleTime: 3e4,
		retry: false
	});
	(0, import_react.useEffect)(() => {
		if (isFotaListError) toast.error("Failed to load update history for this device");
	}, [isFotaListError]);
	const fotaHistory = fotaListDetails?.fotaDetails ?? [];
	const fotaPagination = fotaListDetails?.paginationDetails ?? {};
	const handleFotaTableDataChange = (0, import_react.useCallback)((tableParams) => {
		const nextPage = Number(tableParams?.page);
		const nextPageSize = Number(tableParams?.page_size);
		if (!Number.isNaN(nextPage) && nextPage > 0) setFotaPage(nextPage);
		if (!Number.isNaN(nextPageSize) && nextPageSize > 0) setFotaPageSize(nextPageSize);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-50 text-slate-900",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "bg-white border-b border-slate-200 sticky top-0 z-30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => navigate({ to: "/" }),
							className: "flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all border border-slate-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowLeft, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Dashboard" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px bg-slate-200" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconHistory, { className: "w-4 h-4 text-indigo-600" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-sm font-bold text-slate-900 leading-tight",
								children: "FOTA Deployment History"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-slate-500",
								children: ["Device #", deviceIdParam]
							})] })]
						})
					]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bg-white rounded-2xl border border-slate-200 shadow-sm p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-slate-900",
							children: selectedDevice?.name || `Device #${deviceIdParam}`
						}), selectedDevice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selectedDevice.status })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500 mt-0.5",
						children: "Complete historical record of firmware, web, and updater deployments"
					})] })
				}), selectedDevice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100",
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
									children: "Active Firmware"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-slate-700",
								children: selectedDevice.firmwareVersion || selectedDevice.deviceVersion || "UNKNOWN"
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 pb-0 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-slate-900 uppercase tracking-wider",
						children: "Update Logs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500 mt-0.5 mb-4",
						children: "All past FOTA deployments executed for this device"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg",
						children: [
							fotaHistory.length,
							" Record",
							fotaHistory.length === 1 ? "" : "s"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TanStackTable, {
					columns: fotaHistoryColumns,
					data: fotaHistory,
					loading: isFotaDetailsListFetching || isDevicesLoading,
					getData: handleFotaTableDataChange,
					paginationDetails: fotaPagination,
					page: fotaPage,
					page_size: fotaPageSize,
					noDataLabel: "No past update history found for this device",
					heightClass: "h-auto"
				})]
			})]
		})]
	}) });
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FotaInformationPage, {});
}
//#endregion
export { RouteComponent as component };
