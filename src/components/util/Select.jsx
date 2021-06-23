import {
    TextField,
    CircularProgress
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useAxios from 'axios-hooks';

const Select = ({ controller, getOptionLabel, value, setValue, error, helperText, label  }) => {
    const [{ data: options, loading }] = useAxios(`${controller}`, { useCache: false });
    const [{ data }] = useAxios(`${controller}/${value}`, { useCache: false });

    if (loading) return <CircularProgress />;

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
                    error={error}
                    helperText={helperText}
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