import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div>
      {/* header section */}
      <div>
        <Button onClick={() => navigate({ to: "/dashboard" })}>
          Dashboard
        </Button>
        <Button onClick={() => navigate({ to: "/updates" })}>Updates</Button>
        <Button onClick={() => navigate({ to: "/settings" })}>Settings</Button>
      </div>
    </div>
  );
}
