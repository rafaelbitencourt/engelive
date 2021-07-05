import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import { GlobalStyles } from 'components';
import theme from 'theme';
import Routes from 'Routes';
import { AuthProvider, NotificationProvider } from 'context';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const App = () =>
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <AuthProvider>
        <NotificationProvider>
          <GlobalStyles />
          <Routes />
        </NotificationProvider>
      </AuthProvider>
    </MuiPickersUtilsProvider>
  </ThemeProvider>

export default App;
