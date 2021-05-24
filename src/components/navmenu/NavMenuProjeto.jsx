import { useState } from 'react';
import { Box, List, Collapse } from '@material-ui/core';
import NavItem from '../NavItem';

const NavMenuProjeto = ({ idobra, projeto }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <NavItem
                href={`/app/obra/${idobra}/projeto/${projeto.id}/plantas`}
                key={projeto.id}
                title={projeto.descricao}
                cb={() => setIsOpen(!isOpen)}
            />
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ paddingLeft: 2 }}>
                    <List>
                        {projeto.plantas.map((planta) => (
                            <NavItem
                                href={`/app/obra/${idobra}/projeto/${projeto.id}/planta/${planta.id}/detalhes`}
                                key={planta.id}
                                title={planta.descricao}
                            />
                        ))}
                    </List>
                </Box>
            </Collapse>
        </>
    );
};

export default NavMenuProjeto;
