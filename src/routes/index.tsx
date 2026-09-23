import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  );
}
