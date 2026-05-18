import { createFileRoute } from "@tanstack/react-router";
import { RegistryPage } from "@/modules/coldpro/pages/RegistryPage";

export const Route = createFileRoute("/_app/coldpro/registry")({
  component: RegistryPage,
});
