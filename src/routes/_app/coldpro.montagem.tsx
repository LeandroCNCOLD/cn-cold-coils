import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/coldpro/montagem")({
  beforeLoad: () => { throw redirect({ to: "/coldpro/assembly" }); },
});
