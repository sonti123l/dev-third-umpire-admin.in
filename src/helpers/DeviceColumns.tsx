import { useNavigate, useRouter } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import dayjs from "dayjs";

type devicesList = {
  site_name: string;
  name: string;
  site_location: string;
  created_at: string;
  status: string;
  id: string;
};

const DeviceColumns = () => {
  const navigate = useNavigate();

  const columnHelper = createColumnHelper<devicesList>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Store Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("site_name", {
      header: "Site Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("site_location", {
      header: "Store Location",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("created_at", {
      header: "Created At",
      cell: (info) => {
        const value = info.getValue();
        const now = dayjs(value);
        return <p>{now.format("MMMM D, YYYY")}</p>;
      },
    }),
    columnHelper.accessor("status", {
      header: "Device Status",
      cell: (info) => {
        const value = info.getValue();
        return value === "online" ? (
          <div className="flex justify-center items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-600"></div>
            <p>Online</p>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-600"></div>
            <p>Offline</p>
          </div>
        );
      },
    }),
    columnHelper.accessor("id", {
      header: "Actions",
      cell: (info) => {
        const value = info.row.original;
        return (
          <Button onClick={() => navigate({ to: `/devices/${value.id}/info` })}>
            <EyeIcon />
          </Button>
        );
      },
    }),
  ];

  return columns;
};

export default DeviceColumns;
