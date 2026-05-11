/**
 * GeometryCatalogPicker.tsx
 *
 * Botão + Dialog que abre um catálogo de geometrias filtrado por aplicação
 * (evaporator | condenser). Suporta busca textual por sigla / OD / passo.
 *
 * Mesmo padrão do "Selecionar geometria do catálogo" usado no fluxo do
 * condensador no módulo CN-Coils — porém com a aplicação travada para
 * evitar mistura de geometrias.
 */
import { useEffect, useMemo, useState } from "react";
import { Search, Layers } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  loadGeometryCatalog,
  type CoilApplication,
  type GeometryOption,
} from "../services/geometryCatalogService";

interface Props {
  application: CoilApplication;
  value: string;
  onChange: (geometry: GeometryOption) => void;
}

const APP_LABEL: Record<CoilApplication, string> = {
  evaporator: "Evaporação (DX)",
  condenser: "Condensação",
};

export function GeometryCatalogPicker({ application, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<GeometryOption[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadGeometryCatalog().then((cat) => setItems(cat[application]));
  }, [application]);

  const selected = useMemo(
    () => items.find((g) => g.id === value),
    [items, value],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((g) => {
      const hay = `${g.id} ${g.tube_outer_diameter_mm} ${g.tube_pitch_transverse_mm} ${g.row_pitch_mm}`;
      return hay.toLowerCase().includes(q);
    });
  }, [items, query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 w-full justify-start gap-2 text-left text-xs font-normal"
        >
          <Layers className="h-3.5 w-3.5 text-emerald-600" />
          {selected ? (
            <span className="truncate">
              <span className="font-medium">{selected.description}</span>
              <span className="ml-1 text-muted-foreground">
                · Ø{selected.tube_outer_diameter_mm} ·{" "}
                {selected.tube_pitch_transverse_mm}×{selected.row_pitch_mm} mm
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground">
              Selecionar geometria do catálogo…
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Selecionar geometria
            <Badge variant="secondary" className="text-[10px]">
              {APP_LABEL[application]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-[11px] text-blue-800">
          Mostrando apenas geometrias de <b>{APP_LABEL[application]}</b>.
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Buscar por sigla, diâmetro ou passo…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 pl-7 text-xs"
          />
        </div>

        <div className="max-h-[420px] overflow-y-auto rounded border">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-muted text-[10px] uppercase text-muted-foreground">
              <tr>
                <th className="px-2 py-1.5 text-left">Sigla</th>
                <th className="px-2 py-1.5 text-right">Ø tubo</th>
                <th className="px-2 py-1.5 text-right">Passo transv.</th>
                <th className="px-2 py-1.5 text-right">Passo filas</th>
                <th className="px-2 py-1.5 text-right">e tubo</th>
                <th className="px-2 py-1.5 text-right">e aleta</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-2 py-6 text-center text-muted-foreground"
                  >
                    Nenhuma geometria encontrada.
                  </td>
                </tr>
              )}
              {filtered.map((g) => {
                const isSel = g.id === value;
                return (
                  <tr
                    key={g.id}
                    onClick={() => {
                      onChange(g);
                      setOpen(false);
                    }}
                    className={`cursor-pointer border-t hover:bg-emerald-50/60 ${
                      isSel ? "bg-emerald-50 font-medium" : ""
                    }`}
                  >
                    <td className="px-2 py-1.5">{g.description}</td>
                    <td className="px-2 py-1.5 text-right font-mono">
                      {g.tube_outer_diameter_mm} mm
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono">
                      {g.tube_pitch_transverse_mm} mm
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono">
                      {g.row_pitch_mm} mm
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono">
                      {g.tube_thickness_mm} mm
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono">
                      {g.fin_thickness_mm} mm
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-muted-foreground">
          A geometria selecionada bloqueia diâmetro do tubo, passo transversal e
          passo entre filas durante a busca.
        </p>
      </DialogContent>
    </Dialog>
  );
}
