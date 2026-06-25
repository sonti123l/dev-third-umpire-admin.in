import DevicesPage from "@/components/devices/DevicesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/devices/$id/info/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DevicesPage />
    </div>
  );
}
