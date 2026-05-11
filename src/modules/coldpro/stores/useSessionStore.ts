import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CalculationSession, UserMode } from "../types/frontend.types";

interface SessionStore {
  sessions: CalculationSession[];
  activeSessionId: string | null;
  createSession: (name: string, mode: UserMode) => string;
  updateSession: (id: string, updates: Partial<CalculationSession>) => void;
  setActiveSession: (id: string) => void;
  getActiveSession: () => CalculationSession | undefined;
  deleteSession: (id: string) => void;
  reset: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,

      createSession: (name, mode) => {
        const id = crypto.randomUUID();
        const session: CalculationSession = {
          id,
          name,
          createdAt: new Date().toISOString(),
          mode,
          systemInput: {},
        };
        set((state) => ({
          sessions: [...state.sessions, session],
          activeSessionId: id,
        }));
        return id;
      },

      updateSession: (id, updates) => {
        set((state) => ({
          sessions: state.sessions.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        }));
      },

      setActiveSession: (id) => set({ activeSessionId: id }),

      getActiveSession: () => {
        const { sessions, activeSessionId } = get();
        return sessions.find((s) => s.id === activeSessionId);
      },

      deleteSession: (id) => {
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
          activeSessionId: state.activeSessionId === id ? null : state.activeSessionId,
        }));
      },

      reset: () => set({ sessions: [], activeSessionId: null }),
    }),
    {
      name: "cn-cold-sessions",
      version: 1,
      partialize: (state) => ({
        sessions: state.sessions,
        activeSessionId: state.activeSessionId,
      }),
    },
  ),
);
