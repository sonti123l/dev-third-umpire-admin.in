import DeviceColumns from "@/helpers/DeviceColumns";
import { getDevicesDetails } from "@/services/dashboardservice/dashboardService";
import { useQuery } from "@tanstack/react-query";
import TanStackTable from "../core/TanstackTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const [devicesList, setDevicesList] = useState([]);

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const result = await getDevicesDetails();
      return result?.data;
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!isSuccess) return;

    

    setDevicesList(data?.devices);
  }, [isSuccess]);

  if (isError) {
    toast.error(error?.message || "Devices list not found");
  }
  return (
    <div>
      <h1>Dashboard Page</h1>

      <TanStackTable columns={DeviceColumns()} data={devicesList} />
    </div>
  );
}
