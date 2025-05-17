import { Button, makeStyles, tokens } from "@fluentui/react-components";
import useStore from "@/hooks/useStore";
import NewStore from "@/components/NewStore";
import StoreProvider from "@/porviders/StoreProvider";
import { useCallback, useMemo } from "react";
import StoreCard from "@/components/StoreCard";
import { DeleteFilled } from "@fluentui/react-icons";

function StoreComponent() {
  const styles = useStyles();
  const { store, setStore } = useStore();

  const deleteStore = useCallback(
    (id: string) => {
      setStore(store.filter((store) => store.id !== id));
    },
    [store, setStore]
  );

  const sessionList = useMemo(
    () =>
      store.map((store) => (
        <StoreCard
          key={store.id}
          store={store}
          floatingAction={<Button appearance="transparent" icon={<DeleteFilled />} onClick={() => deleteStore(store.id)} />}
        />
      )),
    [store, deleteStore]
  );

  return (
    <div className={styles.root}>
      {sessionList}
      <NewStore />
    </div>
  );
}

export default function StorePage() {
  return (
    <StoreProvider>
      <StoreComponent />
    </StoreProvider>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingVerticalM,
  },
  store: {
    wordBreak: "break-all",
  },
});
