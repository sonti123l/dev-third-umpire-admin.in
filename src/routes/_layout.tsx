import Layout from "@/components/layout/Layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard>
      <div>
        <Layout />
        <Outlet />
      </div>
    </AuthGuard>
  );
}
