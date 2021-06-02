import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes'; 
import AuthService from './services/auth.service';
import './api/requisicoes';

function App() {
  const currentUser = AuthService.getCurrentUser();
  const routing = useRoutes(routes(!!currentUser));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
}

export default App;
