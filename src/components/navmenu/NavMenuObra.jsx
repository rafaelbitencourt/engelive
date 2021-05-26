import { useState } from 'react';
import {
    Box,
    Collapse,
    Tooltip,
    IconButton
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import NavMenuProjeto from './NavMenuProjeto';
import NavItem from '../NavItem';

const NavMenuObra = ({ obra }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Box display="flex" flexDirection="row">
                <Tooltip title="Atualizar">
                    <IconButton variant="contained" color="primary" aria-label="Atualizar" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Tooltip>
                <NavItem
                    href={`/app/obra/${obra.id}/projetos`}
                    title={obra.nome}
                />
            </Box>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ paddingLeft: 2 }}>
                    {obra.projetos.map((projeto) => (
                        <NavMenuProjeto key={`projeto${projeto.id}`} idobra={obra.id} projeto={projeto} />
                    ))}
                </Box>
            </Collapse>
        </>
    );
};

export default NavMenuObra;
