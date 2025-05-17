import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '@/contexts/Store.context';
import type { StoreData } from '@/types/store.type';
import useSession from '@/hooks/useSession';

export default function StoreProvider({ children }: Readonly<PropsWithChildren>) {
  const { session: sessions } = useSession();
  const [session, setSession] = useState<string>();
  const [store, setStore] = useState<string>();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = params.id;

    if (!id || !sessions.length || sessions.every((session) => session.id !== id)) return navigate('/') && undefined;

    setSession(id);
  }, [sessions, params.id, navigate, setSession]);

  useEffect(() => {
    if (!session) return;

    const callback = () => {
      setStore(localStorage.getItem(session) ?? undefined);
    };

    callback();
    window.addEventListener('storage', callback);

    return () => {
      window.removeEventListener('storage', callback);
    };
  }, [session, setStore]);

  useEffect(() => {
    if (!session || !store) return;

    localStorage.setItem(session, store);
  }, [session, store]);

  const storeObject = useMemo<StoreData[]>(() => {
    if (!store) return [];

    try {
      return JSON.parse(store);
    } catch {
      return [];
    }
  }, [store]);

  const setStoreObject = useCallback(
    (store: StoreData[]) => {
      setStore(JSON.stringify(store));
    },
    [setStore]
  );

  const value = useMemo(
    () => ({
      store: storeObject,
      setStore: setStoreObject,
    }),
    [storeObject, setStoreObject]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
