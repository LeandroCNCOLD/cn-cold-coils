import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/coldpro/system-balance")({
  beforeLoad: () => { throw redirect({ to: "/coldpro/simulation" }); },
});
