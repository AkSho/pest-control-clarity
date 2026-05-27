import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/what-to-expect")({
  beforeLoad: () => {
    throw redirect({ to: "/products/starter-kit", statusCode: 301 });
  },
});
