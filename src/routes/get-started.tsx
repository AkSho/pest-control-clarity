import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/get-started")({
  beforeLoad: () => {
    throw redirect({ to: "/products/starter-kit", statusCode: 301 });
  },
});
