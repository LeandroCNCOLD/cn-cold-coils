import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImagePlus, FileText, X, Loader2 } from "lucide-react";

interface Props {
  isLoading: boolean;
  onSubmit: (text: string, imageBase64: string | null, logText: string | null) => void;
}

export function DevAssistantInput({ isLoading, onSubmit }: Props) {
  const [text, setText] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [logText, setLogText] = useState<string | null>(null);
  const [logName, setLogName] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLInputElement>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleLog(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogName(file.name);
    const reader = new FileReader();
    reader.onload = () => setLogText(reader.result as string);
    reader.readAsText(file);
  }

  function handleSubmit() {
    if (!text.trim() && !imageBase64 && !logText) return;
    onSubmit(text, imageBase64, logText);
  }

  const hasInput = text.trim() || imageBase64 || logText;

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="dev-input">Descreva o problema, cole o stack trace, ou anexe uma captura de tela</Label>
        <Textarea
          id="dev-input"
          placeholder="Ex: TypeError: Cannot read properties of undefined (reading 'sha') at getRecentCommits..."
          className="min-h-[140px] font-mono text-sm resize-y"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
          {imageBase64 ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
              <ImagePlus className="size-4" />
              <span className="max-w-[140px] truncate">{imageName}</span>
              <button
                onClick={() => { setImageBase64(null); setImageName(null); if (imageRef.current) imageRef.current.value = ""; }}
                className="ml-1 text-blue-400 hover:text-blue-700"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ) : (
            <Button type="button" variant="outline" size="sm" onClick={() => imageRef.current?.click()} disabled={isLoading}>
              <ImagePlus className="size-4 mr-2" />
              Imagem / Screenshot
            </Button>
          )}
        </div>

        <div>
          <input
            ref={logRef}
            type="file"
            accept=".log,.txt,.json,.ts,.tsx,.js,.jsx"
            className="hidden"
            onChange={handleLog}
          />
          {logText ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-700">
              <FileText className="size-4" />
              <span className="max-w-[140px] truncate">{logName}</span>
              <button
                onClick={() => { setLogText(null); setLogName(null); if (logRef.current) logRef.current.value = ""; }}
                className="ml-1 text-amber-400 hover:text-amber-700"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ) : (
            <Button type="button" variant="outline" size="sm" onClick={() => logRef.current?.click()} disabled={isLoading}>
              <FileText className="size-4 mr-2" />
              Log / Arquivo
            </Button>
          )}
        </div>

        <div className="ml-auto">
          <Button onClick={handleSubmit} disabled={!hasInput || isLoading} className="min-w-[120px]">
            {isLoading ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Analisando...
              </>
            ) : (
              "Diagnosticar"
            )}
          </Button>
        </div>
      </div>

      {imageBase64 && (
        <div className="border rounded-md overflow-hidden max-h-48">
          <img src={imageBase64} alt="preview" className="object-contain w-full max-h-48" />
        </div>
      )}
    </div>
  );
}
