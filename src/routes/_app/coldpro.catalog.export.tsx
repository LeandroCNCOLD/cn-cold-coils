import { createFileRoute } from "@tanstack/react-router";
import { CatalogBatchExportPage } from "@/modules/coldpro/pages/CatalogBatchExportPage";

export const Route = createFileRoute("/_app/coldpro/catalog/export")({
  component: CatalogBatchExportPage,
});
