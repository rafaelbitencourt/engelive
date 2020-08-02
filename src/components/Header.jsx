import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthService from '../services/auth.service';
import { ConfirmDialog } from '../components/Dialog';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default ({ showMenu, showLoginRegister, showUserLogout, usuario }) => {
  const classes = useStyles();
  let history = useHistory();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const sair = () => {
    AuthService.logout();
    history.push("/");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {showMenu &&
            <IconButton hidden={showMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>}

          <Typography variant="h6" className={classes.title}>
            EngeLive
          </Typography>
          {showUserLogout &&
            <Typography variant="h6">
              {usuario ? 'Olá, ' + usuario.usuario + '!' : ''}
            </Typography>
          }
          {showUserLogout &&
            <Button color="inherit" onClick={() => setConfirmOpen(true)}>Sair</Button>
          }
          {showLoginRegister &&
            <React.Fragment>
              <Button component={Link} color="inherit" to={'/login'}>Entrar</Button>
              <Button component={Link} color="inherit" to={'/register'}>Cadastre-se</Button>
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>
      <ConfirmDialog
        titulo="Sair"
        mensagem="Tem certeza de que deseja sair?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={sair}
      />
    </div>
  );
}