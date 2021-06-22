import React from 'react';
import { TextField } from '@material-ui/core';

import * as Yup from 'yup';
import { Cadastro, DatePickerField } from 'components';

const CadastroObra = ({ idobra }) => {
    const getFields = ({
        errors,
        handleBlur,
        handleChange,
        touched,
        values,
        setFieldValue,
        setFieldError,
        Field
    }) => (
        <>
            <TextField
                error={Boolean(touched.nome && errors.nome)}
                fullWidth
                helperText={touched.nome && errors.nome}
                label="Nome"
                name="nome"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.nome}
            />
            <Field
                component={DatePickerField}
                fullWidth
                label="Previsão"
                name="previsao"
                onBlur={handleBlur}
                value={values.previsao}
                helperText={errors.previsao}
                error={Boolean(errors.previsao)}
                onError={error => {
                    if (error !== errors.previsao) 
                        setFieldError("previsao", error);
                }}
                onChange={date => setFieldValue('previsao', date, false)}
            />
        </>
    )

    return (
        <Cadastro
            title="Obra"
            controller="obras"
            id={idobra}
            defaultValues={{
                nome: "",
                previsao: ""
            }}
            getFields={getFields}
            validationSchema={Yup.object().shape({
                nome: Yup.string().max(255).required('Nome é obrigatório'),
                previsao: Yup.mixed().required('Previsão é obrigatória')
            })}
            redirectAfterDelete="/app/obras"
        />
    );
}

export default CadastroObra;