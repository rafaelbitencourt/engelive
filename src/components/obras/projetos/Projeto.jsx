import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Tooltip,
    IconButton,
    CircularProgress
} from '@material-ui/core';
import {
    Save as SaveIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

import useAxios from 'axios-hooks';
import { Loading, Error } from 'components';
import { ConfirmDialog } from 'components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { SelectTiposProjetos } from 'components/tiposprojetos';

const Obra = ({ idobra, idprojeto }) => {
    const [{ data, loading, error }] = useAxios(`projetos/${idprojeto}`, { useCache: false });
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [{ loading: loadingSave, error: errorSave },
        executeSave
    ] = useAxios(
        {
            url: `projetos${idprojeto && `/${idprojeto}`}`,
            method: `${idprojeto ? 'PUT' : 'POST'}`
        },
        { manual: true }
    );

    const [
        { loading: loadingDelete, error: errorDelete, response: responseDelete },
        executeDelete
    ] = useAxios(
        {
            url: `projetos/${idprojeto}`,
            method: 'DELETE'
        },
        { manual: true }
    )

    const cbSubmit = (values) => {
        executeSave({ data: values });
    };

    if (responseDelete && responseDelete.status === 200) return <Navigate to={`/app/obra/${idobra}/projetos`} replace />;

    if (error) return <Error error={error} />

    return (
        <Box
            component={Paper}
            display="flex"
            flexDirection="column"
            height="100%"
            p={2}
        >
            {loading
                ?
                <>
                    <Typography
                        color="textPrimary"
                        variant="h2"
                    >
                        Projeto
                    </Typography>
                    <Loading />
                </>
                :
                <>
                    <Formik
                        initialValues={data || {}}
                        validationSchema={Yup.object().shape({
                            idtipoprojeto: Yup.number().required('Tipo de projeto é obrigatório')
                        })}
                        onSubmit={cbSubmit}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            touched,
                            values,
                            setFieldValue
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box display="flex">
                                    <Typography
                                        color="textPrimary"
                                        variant="h2"
                                    >
                                        Projeto
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    {loadingSave
                                        ?
                                        <IconButton>
                                            <CircularProgress size={24} />
                                        </IconButton>
                                        :
                                        <Tooltip title="Salvar">
                                            <IconButton type="submit">
                                                <SaveIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    {loadingDelete
                                        ?
                                        <IconButton>
                                            <CircularProgress size={24} />
                                        </IconButton>
                                        :
                                        <Tooltip title="Excluir">
                                            <IconButton onClick={() => setConfirmOpen(true)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </Box>
                                <SelectTiposProjetos
                                    errorField={Boolean(errors.idtipoprojeto)}
                                    helperTextField={errors.idtipoprojeto}
                                    value={values.idtipoprojeto}
                                    setValue={(value) => setFieldValue("idtipoprojeto", value)}
                                />
                            </form>
                        )}
                    </Formik>
                </>
            }
            <ConfirmDialog
                titulo="Excluir?"
                mensagem="Tem certeza de que deseja excluir?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={executeDelete}
            />
        </Box>
    );
}

export default Obra;