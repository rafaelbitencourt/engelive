import React from 'react';
import './App.css';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Footer from './components/Footer.jsx';
import Projetos from './pages/Projetos.jsx';
import Projeto from './pages/Projeto.jsx';
import Plantas from './pages/Plantas.jsx';
import Planta from './pages/Planta.jsx';
import PlantaMateriais from './pages/PlantaMateriais.jsx';
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
            <PrivateRoute path="/projeto/:idprojeto/planta/:idplanta/materiais" component={PlantaMateriais} />
            <PrivateRoute path="/projeto/:idprojeto/planta/:idplanta?" component={Planta} />
            <PrivateRoute path="/projeto/:idprojeto/plantas" component={Plantas} />
            <PrivateRoute path="/projeto/:idprojeto?" component={Projeto} />
            <PrivateRoute path="/projetos" component={Projetos} />
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
