import React from 'react';
import { TextField } from '@material-ui/core';

import * as Yup from 'yup';
import { Cadastro, ImagemField } from 'components';

const CadastroPlanta = ({ idobra, idprojeto, idplanta }) => {

    const getFields = ({
        errors,
        handleBlur,
        handleChange,
        touched,
        values,
        setFieldValue
    }) => (
        <>
            <TextField
                error={Boolean(touched.descricao && errors.descricao)}
                fullWidth
                helperText={touched.descricao && errors.descricao}
                label="Descrição"
                name="descricao"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.descricao}
            />
            <ImagemField
                value={values.imagem}
                setValue={value => setFieldValue('imagem', value)}
                helperText={touched.imagem && errors.imagem}
            />
        </>
    )

    return (
        <Cadastro
            title="Planta"
            controller="plantas"
            id={idplanta}
            defaultValues={{
                idprojeto,
                descricao: "",
                imagem: null
            }}
            getFields={getFields}
            validationSchema={Yup.object().shape({
                descricao: Yup.string().max(255).required('Descrição é obrigatória'),
                imagem: Yup.mixed().test("imagem", "Imagem é obrigatória", (value) => value instanceof File)
            })}
            redirectAfterDelete={`/app/obra/${idobra}/projeto/${idprojeto}`}
        />
    );
}

export default CadastroPlanta;