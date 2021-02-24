import React from 'react';
import './App.css';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Footer from './components/Footer.jsx';
import Obras from './pages/Obras.jsx';
import Obra from './pages/Obra.jsx';
import Projetos from './pages/Projetos.jsx';
import Projeto from './pages/Projeto.jsx';
import Plantas from './pages/Plantas.jsx';
import Planta from './pages/Planta.jsx';
import PlantaMateriais from './pages/PlantaMateriais.jsx';
import Materiais from './pages/Materiais.jsx';
import Material from './pages/Material.jsx';
import TiposProjetos from './pages/TiposProjetos.jsx';
import TipoProjeto from './pages/TipoProjeto.jsx';
import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Router >
      <div className={classes.root}>
        <CssBaseline />
        <main>
          <Switch>
            <PrivateRoute path="/obra/:idobra/planta/:idplanta/materiais" component={PlantaMateriais} />
            <PrivateRoute path="/obra/:idobra/planta/:idplanta?" component={Planta} />
            <PrivateRoute path="/obra/:idobra/plantas" component={Plantas} />
            <PrivateRoute path="/obra/:idobra/projetos" component={Projetos} />
            <PrivateRoute path="/obra/:idobra/projeto/:idprojeto?" component={Projeto} />
            <PrivateRoute path="/obra/:idobra?" component={Obra} />
            <PrivateRoute path="/obras" component={Obras} />
            <PrivateRoute path="/materiais" component={Materiais} />
            <PrivateRoute path="/material/:idmaterial?" component={Material} />
            <PrivateRoute path="/tipos_projetos" component={TiposProjetos} />
            <PrivateRoute path="/tipo_projeto/:idtipoprojeto?" component={TipoProjeto} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />            
            <Route path="/" component={Home}/>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
