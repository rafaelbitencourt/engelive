import React from 'react';
import { TextField } from '@material-ui/core';

import * as Yup from 'yup';
import { Cadastro } from 'components'

const CadastroTiposProjetos = ({ idtipoprojeto }) => {
    const getFields = ({
        errors,
        handleBlur,
        handleChange,
        touched,
        values
    }) => (
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
    )

    return (
        <Cadastro
            title="Tipo de projeto"
            controller="tipos_projetos"
            id={idtipoprojeto}
            defaultValues={{
                nome: ""
            }}
            getFields={getFields}
            validationSchema={Yup.object().shape({
                nome: Yup.string().max(255).required('Nome é obrigatório')
            })}
            redirectAfterDelete="/app/tiposprojetos"
        />
    );
}

export default CadastroTiposProjetos;