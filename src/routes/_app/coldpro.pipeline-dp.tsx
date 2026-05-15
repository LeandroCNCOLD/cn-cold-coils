import { createFileRoute } from "@tanstack/react-router";
import { PipelineDeltaPPage } from "@/modules/coldpro/pages/PipelineDeltaPPage";

export const Route = createFileRoute("/_app/coldpro/pipeline-dp")({
  component: PipelineDeltaPPage,
});
