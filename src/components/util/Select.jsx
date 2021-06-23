import {
    TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useAxios from 'axios-hooks';
import {Loading} from 'components';

const Select = ({ value, setValue, errorField, helperTextField, nameField, controller, label, getOptionLabel }) => {
    const [{ data: options, loading }] = useAxios(`${controller}`, { useCache: false });
    const [{ data }] = useAxios(`${controller}/${value}`, { useCache: false });

    if (loading) return <Loading/>;

    return (
        <Autocomplete
            value={(value && data) || null}
            options={options || []}
            autoHighlight
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={getOptionLabel}
            renderOption={getOptionLabel}
            onChange={(e, value) => {
                setValue(value?.id);
              }}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
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

export default Select;