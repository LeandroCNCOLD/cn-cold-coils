import { createFileRoute } from "@tanstack/react-router";
import { CommissioningPage } from "@/modules/coldpro/pages/CommissioningPage";

export const Route = createFileRoute("/_app/coldpro/audit")({
  component: CommissioningPage,
});
