import React from 'react';
import { TextField } from '@material-ui/core';

import * as Yup from 'yup';
import { Cadastro, ImagemField } from 'components';

const CadastroDetalhe = ({ idobra, idprojeto, iddetalhe }) => {

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
            <ImagemField
                value={values.imagem}
                setValue={value => setFieldValue('imagem', value)}
                helperText={touched.imagem && errors.imagem}
            />
        </>
    )

    return (
        <Cadastro
            title="Detalhe"
            controller="detalhes"
            id={iddetalhe}
            defaultValues={{
                idprojeto,
                nome: "",
                imagem: null
            }}
            getFields={getFields}
            validationSchema={Yup.object().shape({
                nome: Yup.string().max(255).required('Nome é obrigatório'),
                imagem: Yup.mixed().test("imagem", "Imagem é obrigatória", (value) => value instanceof File)
            })}
            redirectAfterDelete={`/app/obra/${idobra}/projeto/${idprojeto}`}
        />
    );
}

export default CadastroDetalhe;