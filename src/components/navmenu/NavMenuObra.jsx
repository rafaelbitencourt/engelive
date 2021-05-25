import { useState } from 'react';
import { Box, List, Collapse } from '@material-ui/core';
import NavMenuProjeto from './NavMenuProjeto';
import NavItem from '../NavItem';

const NavMenuObra = ({ obra }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <NavItem
                href={`/app/obra/${obra.id}/projetos`}
                title={obra.nome}
                cb={() => setIsOpen(!isOpen)}
            />
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
