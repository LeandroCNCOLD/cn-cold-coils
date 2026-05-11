import { ChevronRight, Cpu, Wind, Flame, BarChart2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppEngineeringStore } from "./store/useAppEngineeringStore";
import { Step1CompressorPanel } from "./components/Step1CompressorPanel";
import { Step2EvaporatorPanel } from "./components/Step2EvaporatorPanel";
import { Step3CondenserPanel } from "./components/Step3CondenserPanel";
import { Step4HubPanel } from "./components/Step4HubPanel";

const STEPS = [
  { id: 1, label: "Compressor", icon: Cpu },
  { id: 2, label: "Evaporador", icon: Wind },
  { id: 3, label: "Condensador", icon: Flame },
  { id: 4, label: "Simulação", icon: BarChart2 },
] as const;

export function ApplicationEngineeringPage() {
  const { currentStep, setStep, step1, step2, step3 } = useAppEngineeringStore();

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
      {/* Stepper */}
      <div className="flex items-center border-b border-slate-200 bg-white px-6 py-3">
        <h1 className="mr-6 text-sm font-semibold text-slate-700">Engenharia de Aplicação</h1>
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
      </div>

      {/* Conteúdo */}
      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-4xl space-y-4 p-6">
          {currentStep === 1 && (
            <Step1CompressorPanel onNext={() => setStep(2)} />
          )}
          {currentStep === 2 && (
            <Step2EvaporatorPanel onNext={() => setStep(3)} />
          )}
          {currentStep === 3 && (
            <Step3CondenserPanel onNext={() => setStep(4)} />
          )}
          {currentStep === 4 && <Step4HubPanel />}
        </div>
      </ScrollArea>
    </div>
  );
}
