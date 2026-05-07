import { createFileRoute } from "@tanstack/react-router";
import { ExportPage } from "@/modules/coldpro/pages/ExportPage";

export const Route = createFileRoute("/_app/coldpro/export")({
  component: ExportPage,
});
