import { useContext } from "react";
import { SessionContext } from "@/contexts/Session.context";

export default function useSession() {
  const session = useContext(SessionContext);

  if (!session) throw new Error("SessionProvider is required");

  return session;
}
