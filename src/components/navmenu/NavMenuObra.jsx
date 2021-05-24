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
                key={obra.id}
                title={obra.descricao}
                cb={() => setIsOpen(!isOpen)}
            />
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ paddingLeft: 2 }}>
                    <List>
                        {obra.projetos.map((projeto) => (
                            <NavMenuProjeto idobra={obra.id} projeto={projeto} />
                        ))}
                    </List>
                </Box>
            </Collapse>
        </>
    );
};

export default NavMenuObra;
