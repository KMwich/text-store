import type { StoreData } from '@/types/store.type';
import { Body1, makeStyles, type CardProps } from '@fluentui/react-components';
import { useCallback, useState } from 'react';
import Card from './Card';

type StoreCardProps = CardProps & {
  store: StoreData;
};

export default function StoreCard({ store, ...props }: Readonly<StoreCardProps>) {
  const styles = useStyles();
  const [copied, setCopied] = useState('');

  const onStoreSelect = useCallback((data: string) => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        setCopied('The text is copied!!');

        setTimeout(() => {
          setCopied('');
        }, 2000);
      })
      .catch();
  }, []);

  return (
    <Card {...props} onClick={() => onStoreSelect(store.data)}>
      <Body1 className={styles.store}>{copied || store.data}</Body1>
    </Card>
  );
}

const useStyles = makeStyles({
  store: {
    wordBreak: 'break-all',
  },
});
