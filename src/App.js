import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes, useLocation } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import { GlobalStyles } from 'components';
import theme from 'theme';
import routes from 'routes'; 
import AuthService from 'services/auth.service';
import 'api/requisicoes';

function App() {
  const location = useLocation();
  const currentUser = AuthService.getCurrentUser();
  const routing = useRoutes(routes(!!currentUser, location.pathname));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
}

export default App;
