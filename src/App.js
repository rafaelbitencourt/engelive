import React from 'react';
import './App.css';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Header from './components/Header.jsx';
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
  Route,
  Redirect
} from "react-router-dom";

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
        <Header />
        <main>
          <Switch>
            <Route path="/projeto/:idprojeto/planta/:idplanta/materiais" component={PlantaMateriais} />
            <Route path="/projeto/:idprojeto/planta/:idplanta?" component={Planta} />
            <Route path="/projeto/:idprojeto/plantas" component={Plantas} />
            <Route path="/projeto/:idprojeto?" component={Projeto} />
            <Route path="/projetos" component={Projetos} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />            
            <Route path="/">
              <Redirect to='/projetos' />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
