import { makeStyles, Body1, tokens, Button } from "@fluentui/react-components";
import Card from "@/components/Card";
import useSession from "@/hooks/useSession";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import NewSession from "@/components/NewSession";
import { DeleteFilled } from "@fluentui/react-icons";

export default function SessionPage() {
  const styles = useStyles();

  const { session, setSession } = useSession();
  const navigate = useNavigate();

  const selectSession = useCallback(
    (session: string) => {
      navigate(`/session/${session}`);
    },
    [navigate]
  );

  const deleteSession = useCallback(
    (id: string) => {
      setSession(session.filter((session) => session.id !== id));
    },
    [session, setSession]
  );

  const sessionList = useMemo(
    () =>
      session.map((session) => (
        <Card
          key={session.id}
          onClick={() => selectSession(session.id)}
          floatingAction={<Button appearance="transparent" icon={<DeleteFilled />} onClick={() => deleteSession(session.id)} />}
        >
          <Body1 className={styles.session}>{session.name}</Body1>
        </Card>
      )),
    [session, selectSession, deleteSession, styles]
  );

  return (
    <div className={styles.root}>
      {sessionList}
      <NewSession />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
  },
  session: {
    wordBreak: "break-all",
  },
});
