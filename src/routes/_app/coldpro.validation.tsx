import { createFileRoute } from "@tanstack/react-router";
import { ValidationDashboardPage } from "@/modules/coldpro/pages/ValidationDashboardPage";

export const Route = createFileRoute("/_app/coldpro/validation")({
  component: ValidationDashboardPage,
});
