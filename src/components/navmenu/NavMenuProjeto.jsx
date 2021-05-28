import { useState } from 'react';
import {
    Box,
    Collapse,
    IconButton
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import NavItem from '../NavItem';

const NavMenuProjeto = ({ idobra, projeto }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Box display="flex" flexDirection="row">
                <IconButton variant="contained" color="primary" aria-label="collapse" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <NavItem
                    href={`/app/obra/${idobra}/projeto/${projeto.id}/plantas`}
                    title={projeto.tipos_projeto.nome}
                />
            </Box>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ paddingLeft: 2 }}>
                    {projeto.plantas.map((planta) => (
                        <NavItem
                            href={`/app/obra/${idobra}/projeto/${projeto.id}/planta/${planta.id}/detalhes`}
                            key={`planta${planta.id}`}
                            title={planta.descricao}
                        />
                    ))}
                </Box>
            </Collapse>
        </>
    );
};

export default NavMenuProjeto;
