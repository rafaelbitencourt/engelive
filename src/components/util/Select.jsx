import {
    TextField,
    CircularProgress
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useAxios from 'axios-hooks';

const Select = (props) => {
    const { 
        controller, 
        controllerValue, 
        getOptionLabel, 
        value, 
        setValue, 
        error, 
        helperText, 
        label 
    } = props;

    const [{ data: options, loading: loadingOptions }] = useAxios(`${controller}`);
    const [{ data }] = useAxios(`${controllerValue || controller}/${value}`);

    if (loadingOptions) return <CircularProgress />;

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
            loading={loadingOptions}
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