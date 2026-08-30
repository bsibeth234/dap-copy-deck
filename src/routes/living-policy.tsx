import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/living-policy")({
  beforeLoad: () => {
    throw redirect({ to: "/how-it-works" });
  },
});
