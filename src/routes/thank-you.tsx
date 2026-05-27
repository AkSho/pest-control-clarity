import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/thank-you")({
  beforeLoad: () => {
    throw redirect({ to: "/products/starter-kit", statusCode: 301 });
  },
});
