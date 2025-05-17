import { FluentProvider, makeStyles, tokens, webLightTheme } from '@fluentui/react-components';
import SessionProvider from './porviders/SessionProvider';
import Router from './Router';

function App() {
  const styles = useStyles();

  return (
    <FluentProvider theme={webLightTheme} className={styles.fluentProvider}>
      <SessionProvider>
        <Router />
      </SessionProvider>
    </FluentProvider>
  );
}

export default App;

const useStyles = makeStyles({
  fluentProvider: {
    padding: tokens.spacingVerticalM,
  },
});
