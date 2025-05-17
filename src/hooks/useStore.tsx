import { useContext } from "react";
import { StoreContext } from "@/contexts/Store.context";

export default function useStore() {
  const store = useContext(StoreContext)

  if (!store) throw new Error('StoreProvider is required');

  return store;
}