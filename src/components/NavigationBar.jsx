import React, { useState } from 'react';

import { NavLink, withRouter } from 'react-router-dom';

import {
    IconButton,
    Drawer,
    MenuList,
    MenuItem,
    ListItemText,
    Collapse,
    List,
    ListItem,
    Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const obras = [{
    id: 2,
    descricao: "Casa Gege",
    projetos: [{
        id: 36,
        descricao: "Arquitetônico",
        plantas: [{
            id: 37,
            descricao: "Planta baixa"
        }, {
            id: 38,
            descricao: "Planta de situação"
        }]
    }]
}];

const NavigationBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProjetos, setIsOpenProjetos] = useState(false);
    const [isOpenPlantas, setIsOpenPlantas] = useState({});

    const handleDrawerOpen = () => {
        setIsOpen(true);
    };

    const handleDrawerClose = () => {
        setIsOpen(false);
    };

    // const handleOpenProjetos = (key) => {
    //     // var value = isOpenProjetos[key];
    //     setIsOpenProjetos(true/*{[key]: true}*/);
    // };

    const activeRoute = (routeName) => {
        return props.location.pathname === routeName ? true : false;
    }

    const content = (<List>
        {/* {Routes.map((prop, key) => {
        return (
            <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
            <MenuItem selected={activeRoute(prop.path)}>
                <ListItemText primary={prop.sidebarName} />
            </MenuItem>
            </NavLink>
        );
        })} */}
        <NavLink to={"/tipos_projetos"} style={{ textDecoration: 'none' }} key={"tipos_projetos"}>
            <ListItem selected={activeRoute("/tipos_projetos")}>
                <ListItemText /*primary={"Tipos de projeto"}*/ secondary={"Tipos de TESTE"} />
            </ListItem>
        </NavLink>
        <NavLink to={"/obras"} style={{ textDecoration: 'none' }} key={"obras"}>
            <ListItem selected={activeRoute("/obras")}>
                <ListItemText primary={"Obras"} />
            </ListItem>
        </NavLink>
        {obras.map((obra, key) => {
            const path = `/obra/${obra.id}/projetos`;
            return (
                <div key={key}>
                    <NavLink to={path} style={{ textDecoration: 'none' }} >
                        <ListItem selected={activeRoute(path)}>
                            <ListItemText primary={obra.descricao} />
                        </ListItem>
                    </NavLink>
                    {/* <Collapse in={isOpenProjetos[key]} timeout="auto" unmountOnExit> */}

                    {/* </Collapse> */}
                    {obra.projetos.map((projeto, key) => {
                        const pathProjeto = `/obra/${obra.id}/projeto/${projeto.id}/plantas`;
                        return (
                            <div key={key}>
                                <NavLink to={pathProjeto} style={{ textDecoration: 'none' }} >
                                    <ListItem selected={activeRoute(pathProjeto)}>
                                        <ListItemText primary={projeto.descricao} />
                                    </ListItem>
                                </NavLink>
                                {projeto.plantas.map((planta, key) => {
                                    const pathPlanta = `/obra/${obra.id}/projeto/${projeto.id}/planta/${planta.id}/detalhes`;
                                    return (
                                        <NavLink to={pathPlanta} style={{ textDecoration: 'none' }} key={key}>
                                            <ListItem selected={activeRoute(pathPlanta)}>
                                                <ListItemText primary={planta.descricao} />
                                            </ListItem>
                                        </NavLink>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            );
        })}
    </List>
    );

    return (
        <>
            {/* <Hidden lgUp> */}
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <Drawer open={isOpen} onClose={handleDrawerClose}>
                    {content}
                </Drawer>
            {/* </Hidden>
            <Hidden lgDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: 256,
                            top: 64,
                            height: 'calc(100% - 64px)'
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden> */}
        </>
    );
};

export default withRouter(NavigationBar);