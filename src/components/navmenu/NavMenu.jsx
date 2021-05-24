import { List } from '@material-ui/core';
import NavMenuObra from './NavMenuObra';

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
}, {
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

const NavMenu = () => {
    return (
        <List>
            {obras.map((obra) => (
                <NavMenuObra obra={obra} />
            ))}
        </List>
    );
};

export default NavMenu;
