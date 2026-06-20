import { getDevicesDetails } from "@/services/dashboardservice/dashboardService";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {


  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["devices"],
    queryFn: async() => {
      const result = await getDevicesDetails();
      return result?.data
    },
    staleTime: 60000,
    refetchOnWindowFocus: true
  })
  return (
    <div>
      <h1>Dashboard Page</h1>
    </div>
  );
}
