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
    const widthObj = columns.find((col) => col.id === id);
    return widthObj ? widthObj?.width || widthObj?.size || "100px" : "100px";
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
    <div className="scrollbar overflow-x-auto  w-full ">
      <div
        className={` overflow-auto scrollbar w-full relative  ease-in-out duration-300 transition-all ${heightClass ? heightClass : "h-auto"} [&>*:first-child]:h-full`}
      >
        {!data?.length && !loading ? (
          <div className="flex h-full mt-[5%] justify-center items-center overflow-hidden">
            <p className="text-[20px] flex items-center h-full text-[#333] font-[400]">
              {noDataLabel ? noDataLabel : "No data available"}
            </p>
          </div>
        ) : (
          <div className="max-h-[calc(100vh-180px)]">
            <Table className="relative">
              <TableHeader className="sticky top-[0px] z-[1]  border-r-0">
                {table?.getHeaderGroups()?.map((headerGroup) => (
                  <TableRow key={headerGroup.id + `-${new Date().getTime()}`}>
                    {headerGroup.headers.map(
                      (header: Header<any, unknown>, index: number) => {
                        return (
                          <TableHead
                            key={index + `-${new Date().getTime()}`}
                            colSpan={header.colSpan}
                            className="bg-black"
                            style={{
                              minWidth: getWidth(header.id),
                              width: getWidth(header.id),
                              color: "#fff",
                              fontWeight: "500",
                            }}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                className={`flex items-center gap-1 ${
                                  header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : ""
                                }`}
                                onClick={() => sortAndGetData(header)}
                                style={{
                                  minWidth: getWidth(header.id),
                                  width: getWidth(header.id),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}

                                {/* <SortItems
                                  header={header}
                                  removeSortingForColumnIds={
                                    removeSortingForColumnIds
                                  }
                                /> */}
                              </div>
                            )}
                          </TableHead>
                        );
                      }
                    )}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className="border-x">
                {data?.length ? (
                  table?.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id + `-${new Date().getTime()}`}
                      className="border-b-0 hover:bg-gray-300 even:bg-gray-100 transition-colors duration-200 "
                      {...((row?.original.issue_id as any) &&
                      row?.id &&
                      !row?.original.service_type
                        ? {
                            onClick: () =>
                              router.navigate({
                                to: `/devices/${row.original.id}/info`,
                              }),
                          }
                        : {})}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className="p-2 !bg-transparent"
                          key={cell.id + `-${new Date().getTime()}`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : loading ? (
                  [...Array(25)].map((_, i) => (
                    <TableRow
                      key={`loading-row-${i}`}
                      className="border-b-4   border-b-[#F8F8F8]"
                    >
                      {[...Array(columns.length)].map((_, j) => (
                        <TableCell key={`loading-cell-${i}-${j}`} className="">
                          {j == 1 ? (
                            <div className="p-2 flex gap-2 items-center">
                              <Skeleton className="h-7 w-7 rounded-full bg-gray-200" />
                              <Skeleton className="h-3 w-3/5 bg-gray-200 rounded-none" />
                            </div>
                          ) : (
                            <div className="p-2">
                              <Skeleton className="h-3 w-3/5 bg-gray-200 rounded-none" />
                            </div>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <div></div>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      {data?.length && paginationDetails ? (
        <PaginationComponent
          paginationDetails={paginationDetails}
          capturePageNum={capturePageNum}
          captureRowPerItems={captureRowPerItems}
        />
      ) : (
        <div> </div>
      )}
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
