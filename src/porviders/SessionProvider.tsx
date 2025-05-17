import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { SessionContext } from '@/contexts/Session.context';
import type { SessionData } from 'react-router-dom';

export default function SessionProvider({ children }: Readonly<PropsWithChildren>) {
  const [session, setSession] = useState<string>();

  useEffect(() => {
    const callback = () => {
      setSession(localStorage.getItem('session') ?? undefined);
    };

    callback();
    window.addEventListener('storage', callback);

    return () => {
      window.removeEventListener('storage', callback);
    };
  }, [setSession]);

  useEffect(() => {
    if (!session) return;

    localStorage.setItem('session', session);
  }, [session]);

  const sessionObject = useMemo(() => {
    if (!session) return [];

    try {
      return JSON.parse(session);
    } catch {
      return [];
    }
  }, [session]);

  const setSessionObject = useCallback(
    (store: SessionData) => {
      setSession(JSON.stringify(store));
    },
    [setSession]
  );

  const value = useMemo(
    () => ({
      session: sessionObject,
      setSession: setSessionObject,
    }),
    [sessionObject, setSessionObject]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
