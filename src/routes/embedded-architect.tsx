import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/embedded-architect")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "offers" });
  },
});
