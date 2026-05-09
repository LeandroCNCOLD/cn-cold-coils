import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import { useApplicationEngineering } from "../hooks/useApplicationEngineering";

function StatusBadge({ status }: { status: "approved" | "warning" | "rejected" }) {
  if (status === "approved") {
    return (
      <Badge className="gap-1 bg-green-600 text-white">
        <CheckCircle2 className="h-3 w-3" />
        Aprovado
      </Badge>
    );
  }
  if (status === "warning") {
    return (
      <Badge variant="secondary" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Atenção
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="gap-1">
      <XCircle className="h-3 w-3" />
      Reprovado
    </Badge>
  );
}

export function ValidationPanel() {
  const { validationResult } = useApplicationEngineering();

  if (!validationResult) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Preencha os dados do compressor e das serpentinas e clique em "Calcular" para validar o
            sistema.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { cop_total, cop_compressor, thermal_balance_pct, status, alerts } = validationResult;

  return (
    <div className="space-y-4">
      {/* Status geral */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm">
            Status do Sistema
            <StatusBadge status={status} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs text-muted-foreground">COP Total</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">{cop_total.toFixed(2)}</p>
              <p className="text-[10px] text-muted-foreground">Q_evap / W_total</p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs text-muted-foreground">COP Compressor</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">{cop_compressor.toFixed(2)}</p>
              <p className="text-[10px] text-muted-foreground">Q_evap / W_comp</p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs text-muted-foreground">Balanço Térmico</p>
              <p
                className={`mt-1 text-2xl font-bold tabular-nums ${
                  Math.abs(thermal_balance_pct) > 10
                    ? "text-red-500"
                    : Math.abs(thermal_balance_pct) > 5
                      ? "text-yellow-500"
                      : "text-green-600"
                }`}
              >
                {thermal_balance_pct > 0 ? "+" : ""}
                {thermal_balance_pct.toFixed(1)}%
              </p>
              <p className="text-[10px] text-muted-foreground">
                (Q_cond_avail − Q_cond_req) / Q_cond_req
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Alertas do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((alert, i) => (
              <Alert
                key={i}
                variant={alert.level === "error" ? "destructive" : "default"}
                className="py-2"
              >
                {alert.level === "error" ? (
                  <XCircle className="h-4 w-4" />
                ) : alert.level === "warning" ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <Info className="h-4 w-4" />
                )}
                <AlertTitle className="text-xs font-semibold">{alert.code}</AlertTitle>
                <AlertDescription className="text-xs">{alert.message}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {alerts.length === 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-sm text-green-700">Sistema validado com sucesso</AlertTitle>
          <AlertDescription className="text-xs text-green-600">
            Nenhum alerta encontrado. O sistema está dentro dos parâmetros esperados.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
