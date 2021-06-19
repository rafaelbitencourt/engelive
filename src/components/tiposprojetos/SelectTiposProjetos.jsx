import {
    TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useAxios from 'axios-hooks';

const SelectTiposProjetos = ({ value, setValue, errorField, helperTextField, nameField }) => {
    const [{ data, loading }] = useAxios('tipos_projetos', { useCache: false });
    const [{ data: tipoProjeto }] = useAxios(`tipos_projetos/${value}`, { useCache: false });

    return (
        <Autocomplete
            value={(value && tipoProjeto) || null}
            options={data || []}
            autoHighlight
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.nome}
            renderOption={(option) => option.nome}
            onChange={(e, value) => {
                setValue(value?.id);
              }}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Tipo"
                    variant="outlined"
                    name={nameField}
                    error={errorField}
                    helperText={helperTextField}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}

export default SelectTiposProjetos;