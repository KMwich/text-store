import { createContext } from "react";
import type { SessionData } from "@/types/session.type";

type SessionContextValue = {
  session: SessionData[];
  setSession: (session: SessionData[]) => void;
};

export const SessionContext = createContext<SessionContextValue | null>(null);
