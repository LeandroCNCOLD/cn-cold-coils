import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/coldpro/ficha-tecnica")({
  beforeLoad: () => { throw redirect({ to: "/coldpro/export" }); },
});
