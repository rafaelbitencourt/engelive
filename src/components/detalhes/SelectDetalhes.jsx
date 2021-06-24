import { Select } from 'components';

const SelectDetalhes = (props) => {
    return (
        <Select
            controller={`projeto/${props.idprojeto}/detalhes`}
            label="Detalhe"
            getOptionLabel={(option) => option.nome}
            {...props}
        />
    );
}

export default SelectDetalhes;