import React from 'react';
import { SelectTiposProjetos } from 'components';

import * as Yup from 'yup';
import { Cadastro } from 'components'

const CadastroProjeto = ({ idobra, idprojeto }) => {
    const getFields = ({
        errors,
        values,
        setFieldValue
    }) => (
        <SelectTiposProjetos
            error={Boolean(errors.idtipoprojeto)}
            helperText={errors.idtipoprojeto}
            value={values.idtipoprojeto}
            setValue={(value) => setFieldValue("idtipoprojeto", value)}
        />
    )

    return (
        <Cadastro
            title="Projeto"
            controller="projetos"
            id={idprojeto}
            defaultValues={{
                idobra,
                idtipoprojeto: ""
            }}
            getFields={getFields}
            validationSchema={Yup.object().shape({
                idtipoprojeto: Yup.number().required('Tipo de projeto é obrigatório')
            })}
            redirectAfterDelete={`/app/obra/${idobra}`}
        />
    );
}

export default CadastroProjeto;