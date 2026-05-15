/**
 * EngineeringProjectBar.tsx
 * Barra de ações de projeto para a tela de Engenharia de Aplicação.
 * Permite salvar, abrir e gerenciar projetos de engenharia.
 */
import { useState } from "react";
import { FolderOpen, Save, FolderPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  useProjectStore,
  type SavedProject,
} from "@/modules/cn_coils/store/useProjectStore";
import { useAppEngineeringStore } from "../store/useAppEngineeringStore";

export function EngineeringProjectBar() {
  const {
    step1,
    step2,
    step3,
    compressorSweep,
    updateStep1,
    updateStep2,
    updateStep3,
    setCompressorSweep,
  } = useAppEngineeringStore();
  const {
    projects,
    saveProject,
    updateProject,
    activeProjectId,
    setActiveProject,
    deleteProject,
  } = useProjectStore();
  const [saveOpen, setSaveOpen] = useState(false);
  const [openOpen, setOpenOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const engineeringProjects = projects.filter(
    (p) => p.type === "application_engineering",
  );
  const activeProject = activeProjectId
    ? projects.find((p) => p.id === activeProjectId)
    : null;

  function buildSnapshot() {
    return {
      engineeringState: {
        step1,
        step2,
        step3,
        compressorSweep,
        savedAt: new Date().toISOString(),
        version: 1 as const,
      },
    };
  }

  function handleSave() {
    if (activeProject?.type === "application_engineering") {
      updateProject(activeProject.id, buildSnapshot());
      toast.success(`Projeto "${activeProject.name}" atualizado`);
      return;
    }
    const defaultName = step1.compressorModel
      ? `Eng. ${step1.compressorModel} — ${new Date().toLocaleDateString("pt-BR")}`
      : `Projeto Engenharia — ${new Date().toLocaleDateString("pt-BR")}`;
    setProjectName(defaultName);
    setSaveOpen(true);
  }

  function confirmSave() {
    const name = projectName.trim() || "Projeto Engenharia";
    const id = saveProject(name, "application_engineering", buildSnapshot());
    setActiveProject(id);
    setSaveOpen(false);
    toast.success(`Projeto "${name}" salvo!`);
  }

  function handleOpen(project: SavedProject) {
    const eng = project.snapshot.engineeringState;
    if (!eng) {
      toast.error("Este projeto não contém dados de engenharia.");
      return;
    }
    updateStep1(eng.step1);
    updateStep2(eng.step2);
    updateStep3(eng.step3);
    setCompressorSweep(eng.compressorSweep ?? []);
    setActiveProject(project.id);
    setOpenOpen(false);
    toast.success(`Projeto "${project.name}" carregado`);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {activeProject?.type === "application_engineering" && (
          <Badge variant="outline" className="gap-1 text-[11px]">
            <FolderOpen className="h-3 w-3" />
            {activeProject.name}
          </Badge>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpenOpen(true)}
            className="h-7 gap-1 text-xs"
            disabled={engineeringProjects.length === 0}
          >
            <FolderOpen className="h-3 w-3" />
            Abrir
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="h-7 gap-1 text-xs"
          >
            <Save className="h-3 w-3" />
            {activeProject?.type === "application_engineering"
              ? "Salvar"
              : "Salvar como…"}
          </Button>
        </div>
      </div>

      {/* Dialog: Salvar novo projeto */}
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm">
              <FolderPlus className="h-4 w-4" />
              Salvar Projeto de Engenharia
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmSave()}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Salva o estado completo: compressor, evaporador e condensador.
              Você poderá abrir e continuar de onde parou.
            </p>
            <div className="flex justify-end">
              <Button size="sm" onClick={confirmSave} className="h-7 gap-1 text-xs">
                <Save className="h-3 w-3" />
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Abrir projeto existente */}
      <Dialog open={openOpen} onOpenChange={setOpenOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm">
              <FolderOpen className="h-4 w-4" />
              Projetos de Engenharia salvos
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-auto">
            {engineeringProjects.length === 0 ? (
              <p className="text-xs text-muted-foreground py-8 text-center">
                Nenhum projeto salvo ainda.
              </p>
            ) : (
              engineeringProjects
                .slice()
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between gap-2 rounded-md border border-slate-200 p-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{project.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        Salvo em {new Date(project.updatedAt).toLocaleString("pt-BR")}
                        {project.snapshot.engineeringState?.step1.compressorModel && (
                          <> · {project.snapshot.engineeringState.step1.compressorModel}</>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpen(project)}
                        className="h-7 text-xs"
                      >
                        Abrir
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          deleteProject(project.id);
                          toast.success("Projeto excluído");
                        }}
                        className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
