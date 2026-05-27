import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/rodent-radar_/rodent-population-calculator")({
  beforeLoad: () => {
    throw redirect({ to: "/rodent-radar/rat-pressure-map", statusCode: 301 });
  },
});
