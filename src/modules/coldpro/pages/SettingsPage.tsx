import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAISettings, saveAISettings } from "@/api/aiSettings.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import {
  listUsers,
  createUser,
  updateUserRole,
  setUserActive,
  deleteUser,
  updateModulePermission,
} from "@/api/users.functions";

const ROLES = ["admin", "gerente", "engenheiro", "visualizador"] as const;
type Role = (typeof ROLES)[number];

const ROLE_LABEL: Record<Role, string> = {
  admin: "Administrador",
  gerente: "Gerente",
  engenheiro: "Engenheiro",
  visualizador: "Visualizador",
};

const MODULES: { key: string; label: string }[] = [
  { key: "catalog", label: "Catálogo" },
  { key: "evaporator", label: "Evaporador" },
  { key: "condenser", label: "Condensador" },
  { key: "compressor", label: "Compressor" },
  { key: "simulation", label: "Simulação" },
  { key: "component_library", label: "Biblioteca de componentes" },
  { key: "settings", label: "Configurações" },
];

interface UserRow {
  id: string;
  email: string | null;
  full_name: string | null;
  is_active: boolean;
  roles: Role[];
}

interface PermissionRow {
  role: Role;
  module_key: string;
  can_view: boolean;
  can_edit: boolean;
}

export default function SettingsPage() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Acesso restrito</CardTitle>
          </CardHeader>
          <CardContent>Apenas administradores podem acessar Configurações.</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Configurações</h1>
        <p className="text-sm text-slate-500">
          Gestão de usuários, papéis e preferências do sistema.
        </p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
          <TabsTrigger value="preferences">Preferências</TabsTrigger>
          <TabsTrigger value="integrations">Integrações de IA</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionsTab />
        </TabsContent>
        <TabsContent value="preferences">
          <PreferencesTab />
        </TabsContent>
        <TabsContent value="integrations">
          <AIIntegrationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UsersTab() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listUsers();
      setUsers(Array.isArray(data) ? (data as UserRow[]) : []);
    } catch (e) {
      let msg = "Erro ao buscar usuários.";
      if (e instanceof Response) {
        try {
          msg = (await e.text()) || `HTTP ${e.status}`;
        } catch {
          msg = `HTTP ${e.status}`;
        }
      } else if (e instanceof Error) {
        msg = e.message;
      }
      setUsers([]);
      setError(msg);
      toast.error("Falha ao carregar usuários", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Usuários ({users.length})</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>+ Novo usuário</Button>
          </DialogTrigger>
          <NewUserDialog
            onCreated={() => {
              setOpen(false);
              void load();
            }}
          />
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-slate-500">Carregando...</p>
        ) : error ? (
          <div className="space-y-2">
            <p className="text-sm text-red-600">{error}</p>
            <Button size="sm" variant="outline" onClick={() => void load()}>
              Tentar novamente
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <UserRowItem key={u.id} user={u} onChange={load} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function UserRowItem({ user, onChange }: { user: UserRow; onChange: () => void }) {
  const currentRole = (user.roles[0] ?? "engenheiro") as Role;

  return (
    <TableRow>
      <TableCell>{user.full_name ?? "—"}</TableCell>
      <TableCell>{user.email ?? "—"}</TableCell>
      <TableCell>
        <Select
          value={currentRole}
          onValueChange={async (val) => {
            try {
              await updateUserRole({ data: { user_id: user.id, role: val as Role } });
              toast.success("Papel atualizado");
              onChange();
            } catch (e) {
              toast.error("Falha", { description: String(e) });
            }
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {ROLE_LABEL[r]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Switch
          checked={user.is_active}
          onCheckedChange={async (val) => {
            try {
              await setUserActive({ data: { user_id: user.id, is_active: val } });
              toast.success(val ? "Usuário ativado" : "Usuário desativado");
              onChange();
            } catch (e) {
              toast.error("Falha", { description: String(e) });
            }
          }}
        />
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600"
          onClick={async () => {
            if (!confirm(`Excluir ${user.email}?`)) return;
            try {
              await deleteUser({ data: { user_id: user.id } });
              toast.success("Usuário excluído");
              onChange();
            } catch (e) {
              toast.error("Falha", { description: String(e) });
            }
          }}
        >
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  );
}

function NewUserDialog({ onCreated }: { onCreated: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("engenheiro");
  const [saving, setSaving] = useState(false);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo usuário</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <div>
          <Label>Nome completo</Label>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <Label>E-mail</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>Senha provisória</Label>
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label>Papel</Label>
          <Select value={role} onValueChange={(v) => setRole(v as Role)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => (
                <SelectItem key={r} value={r}>
                  {ROLE_LABEL[r]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button
          disabled={saving || !email || !password || !fullName}
          onClick={async () => {
            setSaving(true);
            try {
              await createUser({
                data: { email, password, full_name: fullName, role },
              });
              toast.success("Usuário criado");
              onCreated();
            } catch (e) {
              toast.error("Falha", { description: String(e) });
            } finally {
              setSaving(false);
            }
          }}
        >
          Criar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function PermissionsTab() {
  const [perms, setPerms] = useState<PermissionRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("module_permissions").select("*");
    setPerms((data ?? []) as PermissionRow[]);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const get = (role: Role, mod: string) =>
    perms.find((p) => p.role === role && p.module_key === mod);

  const toggle = async (
    role: Role,
    mod: string,
    field: "can_view" | "can_edit",
    value: boolean,
  ) => {
    const current = get(role, mod) ?? {
      role,
      module_key: mod,
      can_view: false,
      can_edit: false,
    };
    const next = { ...current, [field]: value };
    try {
      await updateModulePermission({
        data: {
          role,
          module_key: mod,
          can_view: next.can_view,
          can_edit: next.can_edit,
        },
      });
      toast.success("Permissão atualizada");
      void load();
    } catch (e) {
      toast.error("Falha", { description: String(e) });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissões por papel e módulo</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-slate-500">Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Módulo</TableHead>
                  {ROLES.map((r) => (
                    <TableHead key={r} className="text-center">
                      {ROLE_LABEL[r]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {MODULES.map((m) => (
                  <TableRow key={m.key}>
                    <TableCell className="font-medium">{m.label}</TableCell>
                    {ROLES.map((r) => {
                      const p = get(r, m.key);
                      return (
                        <TableCell key={r} className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <label className="flex items-center gap-1 text-xs">
                              <input
                                type="checkbox"
                                checked={p?.can_view ?? false}
                                onChange={(e) => toggle(r, m.key, "can_view", e.target.checked)}
                                disabled={r === "admin"}
                              />
                              Ver
                            </label>
                            <label className="flex items-center gap-1 text-xs">
                              <input
                                type="checkbox"
                                checked={p?.can_edit ?? false}
                                onChange={(e) => toggle(r, m.key, "can_edit", e.target.checked)}
                                disabled={r === "admin"}
                              />
                              Editar
                            </label>
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-3 text-xs text-slate-500">
              Administradores sempre têm acesso total. As alterações são salvas automaticamente.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PreferencesTab() {
  const { user } = useAuth();
  const [unitSystem, setUnitSystem] = useState("SI");
  const [language, setLanguage] = useState("pt-BR");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setUnitSystem(data.unit_system);
        setLanguage(data.language);
      }
      setLoading(false);
    })();
  }, [user]);

  const save = async () => {
    if (!user) return;
    const { error } = await supabase.from("user_preferences").upsert({
      user_id: user.id,
      unit_system: unitSystem,
      language,
    });
    if (error) toast.error("Falha", { description: error.message });
    else toast.success("Preferências salvas");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências gerais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-w-md">
        {loading ? (
          <p className="text-sm text-slate-500">Carregando...</p>
        ) : (
          <>
            <div>
              <Label>Sistema de unidades</Label>
              <Select value={unitSystem} onValueChange={setUnitSystem}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SI">SI (métrico)</SelectItem>
                  <SelectItem value="IP">IP (imperial)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (BR)</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={save}>Salvar preferências</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Suppress unused import warning for Badge (may be used in future iterations)
void Badge;

function AIIntegrationsTab() {
  const [provider, setProvider] = useState<"anthropic" | "openai">("anthropic");
  const [apiKey, setApiKey] = useState("");
  const [maskedKey, setMaskedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const getSettingsFn = useServerFn(getAISettings);
  const saveSettingsFn = useServerFn(saveAISettings);

  useEffect(() => {
    void (async () => {
      try {
        const settings = await getSettingsFn();
        if (settings.ai_provider) setProvider(settings.ai_provider as "anthropic" | "openai");
        if (settings.ai_api_key) setMaskedKey(settings.ai_api_key);
      } catch {
        // sem configuração ainda
      } finally {
        setLoading(false);
      }
    })();
  }, [getSettingsFn]);

  const handleSave = async () => {
    if (!apiKey) { toast.error("Digite a chave de API"); return; }
    setSaving(true);
    try {
      await saveSettingsFn({ data: { provider, api_key: apiKey } });
      setMaskedKey(`${apiKey.slice(0, 8)}****${apiKey.slice(-4)}`);
      setApiKey("");
      toast.success("Chave de IA salva com sucesso");
    } catch (err) {
      toast.error("Erro ao salvar", {
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrações de IA</CardTitle>
        <CardDescription>
          Configure a chave de API para habilitar o Assistente de Engenharia e a Auditoria de
          Máquina com IA. A chave é armazenada de forma segura no banco de dados.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 max-w-lg">
        {loading ? (
          <p className="text-sm text-slate-500">Carregando...</p>
        ) : (
          <>
            {maskedKey ? (
              <div className="flex items-center gap-2 rounded-md border border-green-800/40 bg-green-950/30 p-3">
                <span className="text-sm text-green-400">✓ Chave configurada:</span>
                <code className="font-mono text-xs text-green-300">{maskedKey}</code>
              </div>
            ) : (
              <div className="rounded-md border border-yellow-800/40 bg-yellow-950/30 p-3">
                <span className="text-sm text-yellow-400">
                  ⚠ Nenhuma chave configurada — IA desabilitada
                </span>
              </div>
            )}

            <div className="space-y-2">
              <Label>Provedor de IA</Label>
              <div className="flex gap-3">
                <Button
                  variant={provider === "anthropic" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProvider("anthropic")}
                >
                  Anthropic (Claude)
                </Button>
                <Button
                  variant={provider === "openai" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProvider("openai")}
                >
                  OpenAI (GPT)
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                {provider === "anthropic"
                  ? "Usa Claude 3.5 Sonnet para auditoria e Haiku para chat. Obtenha em console.anthropic.com"
                  : "Usa GPT-4o para auditoria e GPT-4o Mini para chat. Obtenha em platform.openai.com"}
              </p>
            </div>

            <div className="space-y-2">
              <Label>
                {provider === "anthropic" ? "Chave Anthropic (sk-ant-...)" : "Chave OpenAI (sk-...)"}
              </Label>
              <Input
                type="password"
                placeholder={provider === "anthropic" ? "sk-ant-api03-..." : "sk-proj-..."}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={handleSave} disabled={saving || !apiKey}>
              {saving ? "Salvando..." : "Salvar chave"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
