import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePickerField = (props) => (
    <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
        invalidDateMessage="Data inválida"
        maxDateMessage="A data não pode ser posterior à data máxima"
        minDateMessage="A data não pode ser anterior à data mínima"
        {...props}
    />
);

export default DatePickerField;