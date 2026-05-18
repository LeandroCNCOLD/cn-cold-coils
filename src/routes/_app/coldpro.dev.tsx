import { createFileRoute } from "@tanstack/react-router";
import DevAssistantPage from "@/modules/coldpro/pages/DevAssistantPage";

export const Route = createFileRoute("/_app/coldpro/dev")({
  component: DevAssistantPage,
});
