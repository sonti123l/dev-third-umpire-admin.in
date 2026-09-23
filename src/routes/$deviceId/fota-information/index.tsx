import { createFileRoute } from "@tanstack/react-router";
import FotaInformationPage from "@/components/fota/FotaInformationPage";

export const Route = createFileRoute("/$deviceId/fota-information/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FotaInformationPage />;
}
