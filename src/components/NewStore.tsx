import { Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button, Field, Input, type InputProps, tokens, makeStyles } from "@fluentui/react-components";
import { Add48Filled } from "@fluentui/react-icons";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import Card from "./Card";
import useStore from "@/hooks/useStore";

export default function NewStore() {
  const styles = useStyles();
  const { store, setStore } = useStore();
  const [data, setData] = useState("");

  const createSession = useCallback(() => {
    setStore(store.concat([{ id: uuid(), data }]));
  }, [data, store, setStore]);

  const onDataChange = useCallback<NonNullable<InputProps["onChange"]>>(
    (_, data) => {
      setData(data.value);
    },
    [setData]
  );

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Card>
          <Add48Filled />
        </Card>
      </DialogTrigger>
      <DialogSurface className={styles.dialogSurface}>
        <DialogBody>
          <DialogTitle>New Data</DialogTitle>
          <DialogContent>
            <Field label="Data text">
              <Input type="text" value={data} onChange={onDataChange} />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" onClick={createSession}>
                Create
              </Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}

const useStyles = makeStyles({
  dialogSurface: {
    padding: tokens.spacingVerticalM,

    '@media screen and max-width: 767px': {
      margin: tokens.spacingVerticalM,
      marginTop: 'auto',
    }
  }
})
