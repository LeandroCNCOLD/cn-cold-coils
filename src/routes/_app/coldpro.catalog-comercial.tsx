import { createFileRoute } from "@tanstack/react-router";
import { CatalogComercialPage } from "@/modules/coldpro/pages/CatalogComercialPage";

export const Route = createFileRoute("/_app/coldpro/catalog-comercial")({
  component: CatalogComercialPage,
});
