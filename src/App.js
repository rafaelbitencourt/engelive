import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import { GlobalStyles } from 'components';
import theme from 'theme';
import Routes from 'Routes';
import { AuthProvider, NotificationProvider } from 'context';

const App = () =>
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <NotificationProvider>
        <GlobalStyles />
        <Routes />
      </NotificationProvider>
    </AuthProvider>
  </ThemeProvider>

export default App;
