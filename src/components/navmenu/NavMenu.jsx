import { useEffect, useState } from 'react';
import NavMenuObra from './NavMenuObra';
import NavItem from '../NavItem';
import { getMenu } from '../../api/api.js';
import { Sync } from '@material-ui/icons';
import { Box, IconButton, Tooltip } from '@material-ui/core';

const NavMenu = () => {
    const [obras, setObras] = useState([]);

    useEffect(() => {
        atualizarMenu();
    }, []);

    const atualizarMenu = () => {
        getMenu()
            .then(data => {
                setObras(data);
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <NavItem
                    href={`/app/obras`}
                    title="Obras"
                />
                <Tooltip title="Atualizar">
                    <IconButton variant="contained" color="primary" aria-label="Atualizar" onClick={atualizarMenu}>
                        <Sync />
                    </IconButton>
                </Tooltip>
            </Box>
            {obras.map((obra) => (
                <NavMenuObra key={`obra${obra.id}`} obra={obra} />
            ))}
            <Box sx={{ flexGrow: 1 }} />
            <NavItem
                href={`/app/tiposprojetos`}
                title="Tipos de projetos"
            />
        </Box>
    );
};

export default NavMenu;
