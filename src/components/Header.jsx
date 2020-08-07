import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  Description,
  Category,
  People
 } from '@material-ui/icons';

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sair = () => {
    AuthService.logout();
    history.push("/");
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {showMenu &&
            <IconButton hidden={showMenu} onClick={() => handleDrawerOpen(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <List>
          <ListItem button key='Projetos' onClick={() => {
              history.push("/projetos");
              setDrawerOpen(false);
            }}>
            <ListItemIcon><Description /></ListItemIcon>
            <ListItemText primary='Projetos' />
          </ListItem>
          <ListItem button key='Materiais' onClick={() => {
              history.push("/materiais");
              setDrawerOpen(false);
            }}>
            <ListItemIcon><Category /></ListItemIcon>
            <ListItemText primary='Materiais' />
          </ListItem>
          <ListItem button key='Colaboradores'>
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary='Colaboradores' />
          </ListItem>
        </List>
      </Drawer>
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