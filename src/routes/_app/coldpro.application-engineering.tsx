import { createFileRoute } from "@tanstack/react-router";
import { ApplicationEngineeringPage } from "@/modules/coldpro/pages/application-engineering/ApplicationEngineeringPage";

export const Route = createFileRoute("/_app/coldpro/application-engineering")({
  component: ApplicationEngineeringPage,
});
