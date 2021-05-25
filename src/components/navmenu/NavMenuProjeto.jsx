import { useState } from 'react';
import { Box, List, Collapse } from '@material-ui/core';
import NavItem from '../NavItem';

const NavMenuProjeto = ({ idobra, projeto }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <NavItem
                href={`/app/obra/${idobra}/projeto/${projeto.id}/plantas`}
                title={projeto.tipos_projeto.nome}
            />
            {(!!projeto.plantas.length &&
                <Box sx={{ paddingLeft: 2 }}>
                    <NavItem
                        title="Plantas"
                        cb={() => setIsOpen(!isOpen)}
                    />
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
                </Box>
            )}
        </>
    );
};

export default NavMenuProjeto;
