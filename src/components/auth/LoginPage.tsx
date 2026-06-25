import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Login page</p>
      <Button onClick={() => navigate({ to: "/dashboard" })}>
        Go to dashboard
      </Button>
    </div>
  );
}
