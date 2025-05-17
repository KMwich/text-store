import { makeStyles, mergeClasses, Card as OCard, type CardProps } from "@fluentui/react-components";

export default function Card({ children, ...props }: Readonly<CardProps>) {
  const styles = useStyles();
  return (
    <OCard {...props} className={mergeClasses(styles.card, props.className)}>
      {children}
    </OCard>
  );
}

const useStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: "400px",
    minHeight: "180px",
    justifyContent: "center",
    alignItems: "center",
  },
});
