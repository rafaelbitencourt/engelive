import React from 'react';
import { TextField } from '@material-ui/core';

import * as Yup from 'yup';
import { Cadastro } from 'components';

const CadastroObra = ({ idobra }) => {
    const getFields = ({
        errors,
        handleBlur,
        handleChange,
        touched,
        values
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
            <TextField
                error={Boolean(touched.previsao && errors.previsao)}
                fullWidth
                helperText={touched.previsao && errors.previsao}
                label="Previsão"
                margin="normal"
                name="previsao"
                onBlur={handleBlur}
                onChange={handleChange}
                type="date"
                value={values.previsao}
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
                previsao: Yup.date().required('Previsão é obrigatória')
            })}
            redirectAfterDelete="/app/obras"
        />
    );
}

export default CadastroObra;