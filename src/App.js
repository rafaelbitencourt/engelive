import React from 'react';
import './App.css';
// import Home from './pages/Home.jsx';
// import Register from './pages/Register.jsx';
// import Login from './pages/Login.jsx';
// import Footer from './components/Footer.jsx';
// import Obras from './pages/Obras.jsx';
// import Obra from './pages/Obra.jsx';
// import Projetos from './pages/Projetos.jsx';
// import Projeto from './pages/Projeto.jsx';
// import Plantas from './pages/Plantas.jsx';
// import Planta from './pages/Planta.jsx';
// import PlantaDetalhes from './pages/PlantaDetalhes.jsx';
// import Detalhes from './pages/Detalhes.jsx';
// import Detalhe from './pages/Detalhe.jsx';
// import TiposProjetos from './pages/TiposProjetos.jsx';
// import TipoProjeto from './pages/TipoProjeto.jsx';
import { makeStyles } from '@material-ui/core/styles';
import theme from './theme';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core';

import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  // Outlet,
  useRoutes
} from "react-router-dom";
// import { useRoutes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import routes from './routes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));

function App() {
  const classes = useStyles();

  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
     {routing}
     </ThemeProvider>
    // <Router >
    //   <div className={classes.root}>
    //     <CssBaseline />
    //     <Outlet/> 
    //     <main>
    //       <Switch>
    //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/planta/:idplanta/detalhes" component={PlantaDetalhes} />
    //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/planta/:idplanta?" component={Planta} />
    //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/plantas" component={Plantas} />
    //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/detalhe/:iddetalhe?" component={Detalhe} />
    //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/detalhes" component={Detalhes} />
    //         <PrivateRoute path="/obra/:idobra/projetos" component={Projetos} />
    //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto?" component={Projeto} />
    //         <PrivateRoute path="/obra/:idobra?" component={Obra} />
    //         <PrivateRoute path="/obras" component={Obras} />
    //         <PrivateRoute path="/tipos_projetos" component={TiposProjetos} />
    //         <PrivateRoute path="/tipo_projeto/:idtipoprojeto?" component={TipoProjeto} />
    //         <Route path="/register" component={Register} />
    //         <Route path="/login" component={Login} />            
    //         <Route path="/" component={Home}/>
    //       </Switch>
    //     </main>
    //     <Footer />
    //   </div>
    // </Router>
  );
}

export default App;
