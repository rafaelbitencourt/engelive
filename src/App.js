import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import { GlobalStyles } from 'components';
import theme from 'theme';
import Routes from 'Routes';
import 'services/api';
import { AuthProvider } from 'context/AuthContext'

const App = () => 
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <Routes />
      </AuthProvider>
    </ThemeProvider>

export default App;
