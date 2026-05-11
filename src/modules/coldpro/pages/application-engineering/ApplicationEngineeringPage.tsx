import { useState } from "react";
import { ChevronRight, Cpu, Wind, Flame, BarChart2, Settings, GraduationCap, Play, RotateCcw, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppEngineeringStore } from "./store/useAppEngineeringStore";
import { useApplicationEngineering } from "./hooks/useApplicationEngineering";
import { Step1CompressorPanel } from "./components/Step1CompressorPanel";
import { Step2EvaporatorPanel } from "./components/Step2EvaporatorPanel";
import { Step3CondenserPanel } from "./components/Step3CondenserPanel";
import { Step4HubPanel } from "./components/Step4HubPanel";
import { CompressorPanel } from "./components/CompressorPanel";
import { EvaporatorPanel } from "./components/EvaporatorPanel";
import { CondenserPanel } from "./components/CondenserPanel";

const STEPS = [
  { id: 1, label: "Compressor", icon: Cpu },
  { id: 2, label: "Evaporador", icon: Wind },
  { id: 3, label: "Condensador", icon: Flame },
  { id: 4, label: "Simulação", icon: BarChart2 },
] as const;

type Mode = "guiado" | "avancado";

export function ApplicationEngineeringPage() {
  const { currentStep, setStep, step1, step2, step3 } = useAppEngineeringStore();
  const { isCalculating, runCalculation, reset } = useApplicationEngineering();
  const [mode, setMode] = useState<Mode>("guiado");

  function isStepAccessible(stepId: number): boolean {
    if (stepId === 1) return true;
    if (stepId === 2) return step1.completed;
    if (stepId === 3) return step1.completed && step2.completed;
    if (stepId === 4) return step1.completed && step2.completed && step3.completed;
    return false;
  }

  function isStepDone(stepId: number): boolean {
    if (stepId === 1) return step1.completed;
    if (stepId === 2) return step2.completed;
    if (stepId === 3) return step3.completed;
    return false;
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-50">
      {/* Header bar */}
      <div className="flex items-center gap-4 border-b border-slate-200 bg-white px-6 py-3">
        <h1 className="text-sm font-semibold text-slate-700">Engenharia de Aplicação</h1>

        {/* Mode toggle */}
        <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-0.5">
          <button
            onClick={() => setMode("guiado")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
              mode === "guiado"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700",
            )}
          >
            <GraduationCap className="h-3 w-3" />
            Guiado
          </button>
          <button
            onClick={() => setMode("avancado")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
              mode === "avancado"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700",
            )}
          >
            <Settings className="h-3 w-3" />
            Avançado
          </button>
        </div>

        {/* Stepper — only in Guiado mode */}
        {mode === "guiado" && (
          <nav className="flex items-center gap-1">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const accessible = isStepAccessible(step.id);
              const done = isStepDone(step.id);
              const active = currentStep === step.id;
              return (
                <div key={step.id} className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!accessible}
                    onClick={() => accessible && setStep(step.id as 1 | 2 | 3 | 4)}
                    className={cn(
                      "h-8 gap-1.5 rounded-full px-3 text-xs transition-colors",
                      active && "bg-indigo-600 text-white hover:bg-indigo-700",
                      !active && done && "text-green-700 hover:bg-green-50",
                      !active && !done && accessible && "text-slate-600 hover:bg-slate-100",
                      !accessible && "cursor-not-allowed opacity-40",
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {step.id}. {step.label}
                  </Button>
                  {idx < STEPS.length - 1 && (
                    <ChevronRight className="h-3 w-3 text-slate-300" />
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* Conteúdo */}
      <ScrollArea className="flex-1">
        <div
          className={cn(
            "space-y-4 p-6",
            mode === "guiado" ? "mx-auto max-w-4xl" : "mx-auto max-w-[1600px]",
          )}
        >
          {mode === "guiado" && (
            <>
              {currentStep === 1 && <Step1CompressorPanel onNext={() => setStep(2)} />}
              {currentStep === 2 && <Step2EvaporatorPanel onNext={() => setStep(3)} />}
              {currentStep === 3 && <Step3CondenserPanel onNext={() => setStep(4)} />}
              {currentStep === 4 && <Step4HubPanel />}
            </>
          )}

          {mode === "avancado" && (
            <div className="space-y-4">
              {/* Barra de controles */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={reset}
                  disabled={isCalculating}
                  className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Resetar
                </button>
                <button
                  type="button"
                  onClick={runCalculation}
                  disabled={isCalculating}
                  className="flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {isCalculating ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                  {isCalculating ? "Calculando..." : "Calcular Sistema"}
                </button>
              </div>

              {/* Grid 2×2 */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Etapa 1 — Compressor */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Cpu className="h-4 w-4 text-indigo-500" />
                    1. Compressor
                  </h2>
                  <CompressorPanel />
                </div>

                {/* Etapa 2 — Evaporador Semiautomático */}
                <EvaporatorPanel />

                {/* Etapa 3 — Condensador Semiautomático */}
                <CondenserPanel />

                {/* Etapa 4 — Hub (simulação completa) */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
                  <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <BarChart2 className="h-4 w-4 text-purple-500" />
                    4. Simulação
                  </h2>
                  <Step4HubPanel />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
