import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useState } from "react";

import { useLocation, useRouter } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pageProps } from "@/lib/interfaces/core/iTable";
// import TableSortAscIcon from "../icons/sort-asc";
// import TableSortDscIcon from "../icons/sort-dsc";
// import TableSortNormIcon from "../icons/sort-norm";
import { Skeleton } from "../ui/skeleton";
import PaginationComponent from "./Pagination";

const TanStackTable: FC<pageProps> = ({
  columns,
  data,
  loading = false,
  getData,
  paginationDetails,
  removeSortingForColumnIds,
  heightClass,
  noDataLabel,
  page,
  page_size,
  stickyFirstColumn = true,
  stickyLastColumn = true,
}) => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const table = useReactTable({
    columns,
    data: data?.length ? data : [],
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const capturePageNum = (value: number) => {
    getData({
      ...searchParams,
      page_size: searchParams.get("page_size")
        ? Number(searchParams.get("page_size"))
        : page_size,
      page: value,
      order_by: searchParams.get("order_by"),
      order_type: searchParams.get("order_type"),
    });
  };
  const captureRowPerItems = (value: number) => {
    getData({
      ...searchParams,
      page_size: value,
      page: 1,
      order_by: searchParams.get("order_by"),
      order_type: searchParams.get("order_type"),
    });
  };

  const getWidth = (id: string) => {
    const widthObj = columns.find(
      (col) => col.id === id || (col as any).accessorKey === id,
    );
    if (!widthObj) return "130px";
    const size = (widthObj as any).width || (widthObj as any).size;
    if (typeof size === "number") return `${size}px`;
    if (typeof size === "string") return size;
    return "130px";
  };

  const sortAndGetData = (header: any) => {
    if (
      removeSortingForColumnIds &&
      removeSortingForColumnIds.length &&
      removeSortingForColumnIds.includes(header.id)
    ) {
      return;
    }
    let sortBy = header.id;
    let sortDirection = "asc";
    let orderBy = `${sortBy}:asc`;
    if (searchParams.get("order_by")?.startsWith(header.id)) {
      if (searchParams.get("order_by") === `${header.id}:asc`) {
        sortDirection = "desc";
        orderBy = `${header.id}:desc`;
      } else {
        sortBy = "";
        sortDirection = "";
        orderBy = "";
      }
    }
    getData({
      ...searchParams,
      page: 1 || searchParams.get("current_page"),
      page_size: searchParams.get("page_size"),
      order_by: orderBy,
    });
  };

  return (
    <div className="w-full">
      <div
        className={`w-full overflow-x-auto scrollbar relative ${
          heightClass ? heightClass : "h-auto"
        }`}
      >
        {!data?.length && !loading ? (
          <div className="flex min-h-[200px] justify-center items-center p-8">
            <p className="text-sm font-medium text-slate-500">
              {noDataLabel ? noDataLabel : "No data available"}
            </p>
          </div>
        ) : (
          <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
            <table className="w-full caption-bottom text-sm border-separate border-spacing-0 relative">
              <thead className="sticky top-0 z-30 shadow-sm">
                {table?.getHeaderGroups()?.map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header: Header<any, unknown>, index: number) => {
                        const isFirst = stickyFirstColumn && index === 0;
                        const isLast =
                          stickyLastColumn &&
                          index === headerGroup.headers.length - 1;
                        const colWidth = getWidth(header.id);

                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            className={`bg-slate-900 text-white font-semibold text-xs tracking-wider uppercase text-left px-3.5 py-3 border-b border-slate-800 whitespace-nowrap select-none ${
                              isFirst
                                ? "sticky left-0 z-40 border-r border-slate-700 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.35)]"
                                : ""
                            } ${
                              isLast
                                ? "sticky right-0 z-40 border-l border-slate-700 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.35)]"
                                : ""
                            }`}
                            style={{
                              minWidth: colWidth,
                              width: colWidth,
                              maxWidth: isFirst || isLast ? colWidth : undefined,
                              ...(isFirst ? { left: 0 } : {}),
                              ...(isLast ? { right: 0 } : {}),
                            }}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                className={`flex items-center gap-1.5 ${
                                  header.column.getCanSort()
                                    ? "cursor-pointer select-none hover:text-indigo-300 transition-colors"
                                    : ""
                                }`}
                                onClick={() => sortAndGetData(header)}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                              </div>
                            )}
                          </th>
                        );
                      },
                    )}
                  </tr>
                ))}
              </thead>

              <tbody className="divide-y divide-slate-100">
                {data?.length ? (
                  table.getRowModel().rows.map((row, rowIndex) => {
                    const rowBg =
                      rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/60";
                    return (
                      <tr
                        key={row.id}
                        className={`group ${rowBg} hover:bg-indigo-50/40 transition-colors duration-150 ${
                          (row?.original as any)?.issue_id &&
                          row?.id &&
                          !(row?.original as any)?.service_type
                            ? "cursor-pointer"
                            : ""
                        }`}
                        {...((row?.original as any)?.issue_id &&
                        row?.id &&
                        !(row?.original as any)?.service_type
                          ? {
                              onClick: () =>
                                router.navigate({
                                  to: `/devices/${(row.original as any).id}/info`,
                                }),
                            }
                          : {})}
                      >
                        {row.getVisibleCells().map((cell, cellIndex) => {
                          const isFirst = stickyFirstColumn && cellIndex === 0;
                          const isLast =
                            stickyLastColumn &&
                            cellIndex === row.getVisibleCells().length - 1;
                          const colWidth = getWidth(cell.column.id);

                          return (
                            <td
                              key={cell.id}
                              className={`px-3.5 py-2.5 text-sm align-middle whitespace-nowrap border-b border-slate-100 ${
                                isFirst
                                  ? `sticky left-0 z-20 ${rowBg} group-hover:bg-[#f1f5f9] border-r border-slate-200 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.06)]`
                                  : ""
                              } ${
                                isLast
                                  ? `sticky right-0 z-20 ${rowBg} group-hover:bg-[#f1f5f9] border-l border-slate-200 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.06)]`
                                  : ""
                              }`}
                              style={{
                                minWidth: colWidth,
                                width: colWidth,
                                maxWidth:
                                  isFirst || isLast ? colWidth : undefined,
                                ...(isFirst ? { left: 0 } : {}),
                                ...(isLast ? { right: 0 } : {}),
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : loading ? (
                  [...Array(10)].map((_, i) => {
                    const rowBg = i % 2 === 0 ? "bg-white" : "bg-slate-50/60";
                    return (
                      <tr key={`loading-row-${i}`} className={rowBg}>
                        {[...Array(columns.length)].map((_, j) => {
                          const isFirst = stickyFirstColumn && j === 0;
                          const isLast =
                            stickyLastColumn && j === columns.length - 1;
                          const colWidth = getWidth(columns[j]?.id);

                          return (
                            <td
                              key={`loading-cell-${i}-${j}`}
                              className={`px-3.5 py-3 border-b border-slate-100 ${
                                isFirst
                                  ? `sticky left-0 z-20 ${rowBg} border-r border-slate-200 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.06)]`
                                  : ""
                              } ${
                                isLast
                                  ? `sticky right-0 z-20 ${rowBg} border-l border-slate-200 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.06)]`
                                  : ""
                              }`}
                              style={{
                                minWidth: colWidth,
                                width: colWidth,
                                maxWidth:
                                  isFirst || isLast ? colWidth : undefined,
                                ...(isFirst ? { left: 0 } : {}),
                                ...(isLast ? { right: 0 } : {}),
                              }}
                            >
                              <Skeleton className="h-4 w-4/5 bg-slate-200 rounded-md" />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {data?.length && paginationDetails ? (
        <div className="border-t border-slate-100 px-4 py-3 bg-white">
          <PaginationComponent
            paginationDetails={paginationDetails}
            capturePageNum={capturePageNum}
            captureRowPerItems={captureRowPerItems}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TanStackTable;

// const SortItems = ({
//   header,
//   removeSortingForColumnIds,
// }: {
//   header: any;
//   removeSortingForColumnIds?: string[];
// }) => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location?.search);
//   const sortBy = searchParams.get("order_by")?.split(":")[0];
//   const sortDirection = searchParams.get("order_by")?.split(":")[1];
//   if (removeSortingForColumnIds?.includes(header.id)) {
//     return null;
//   }
//   return (
//     <div style={{ display: "flex", alignItems: "center" }}>
//       {sortBy === header.id ? (
//         sortDirection === "asc" ? (
//           <TableSortAscIcon className="size-4 " />
//         ) : (
//           <TableSortDscIcon className="size-4" />
//         )
//       ) : (
//         <TableSortNormIcon className="size-4" />
//       )}
//     </div>
//   );
// };
