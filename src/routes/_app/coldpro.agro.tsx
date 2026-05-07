import { createFileRoute } from "@tanstack/react-router";
import { AgroWorkspacePage } from "@/modules/coldpro/pages/AgroWorkspacePage";

export const Route = createFileRoute("/_app/coldpro/agro")({
  component: AgroWorkspacePage,
});
