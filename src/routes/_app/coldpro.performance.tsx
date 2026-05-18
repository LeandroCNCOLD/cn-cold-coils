import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/coldpro/performance")({
  beforeLoad: () => { throw redirect({ to: "/coldpro/curve" }); },
});
