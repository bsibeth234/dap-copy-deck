import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/Deck";

export const Route = createFileRoute("/deck")({
  head: () => ({
    meta: [{ title: "DAP copy deck" }],
  }),
  component: () => <Deck />,
});
