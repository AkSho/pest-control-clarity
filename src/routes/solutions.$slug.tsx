import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/solutions/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/products/starter-kit", statusCode: 301 });
  },
});
