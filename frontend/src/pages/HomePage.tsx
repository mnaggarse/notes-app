import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to notes app</h1>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/signup">
        <Button>Signup</Button>
      </Link>
    </div>
  );
}
