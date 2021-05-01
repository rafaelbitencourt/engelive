import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from './NavigationBar';

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
  ListItemIcon,
  Collapse
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  Description,
  Category,
  People,
  MoveToInbox,
  ExpandLess,
  ExpandMore,
  StarBorder
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

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

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
          {showMenu && <NavigationBar />}
            
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
              <Button component={Link} color="inherit" to={'/register'}>Criar conta</Button>
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>
      {/* <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <List>
          <ListItem button key='Obras' onClick={() => {
              history.push("/obras");
              setDrawerOpen(false);
            }}>
            <ListItemIcon><Description /></ListItemIcon>
            <ListItemText primary='Obras' />
          </ListItem>
          <ListItem button key='TiposProjetos' onClick={() => {
              history.push("/tipos_projetos");
              setDrawerOpen(false);
            }}>
            <ListItemIcon><Category /></ListItemIcon>
            <ListItemText primary='Tipos de projeto' />
          </ListItem>
          <ListItem button key='Colaboradores'>
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary='Colaboradores' />
          </ListItem>

          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <MoveToInbox />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer> */}
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
