import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Field,
  Input,
  type InputProps,
  tokens,
  makeStyles,
} from '@fluentui/react-components';
import { Add48Filled } from '@fluentui/react-icons';
import useSession from '@/hooks/useSession';
import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Card from './Card';

export default function NewSession() {
  const styles = useStyles();
  const { session, setSession } = useSession();
  const [name, setName] = useState('');

  const createSession = useCallback(() => {
    setSession(session.concat([{ id: uuid(), name }]));
  }, [name, session, setSession]);

  const onNameChange = useCallback<NonNullable<InputProps['onChange']>>(
    (_, data) => {
      setName(data.value);
    },
    [setName]
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
          <DialogTitle>New Session</DialogTitle>
          <DialogContent>
            <Field label="Session Name">
              <Input type="text" value={name} onChange={onNameChange} />
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
    margin: tokens.spacingVerticalM,
    marginTop: 'auto',

    '@media screen and (max-width: 767px)': {
      maxWidth: '100%',
    },

    '@media screen and (min-width: 768px)': {
      margin: 'auto',
    },
  },
});
