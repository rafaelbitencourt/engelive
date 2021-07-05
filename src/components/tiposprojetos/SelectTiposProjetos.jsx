import { Select } from 'components';

const SelectTiposProjetos = (props) => {
    return (
        <Select
            controller="tipos_projetos"
            label="Tipo projeto"
            getOptionLabel={(option) => option.nome}
            {...props}
        />
    );
}

export default SelectTiposProjetos;