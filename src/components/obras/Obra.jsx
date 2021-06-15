import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    TextField,
    FormHelperText,
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

const Obra = ({ idobra }) => {
    const [{ data, loading, error }] = useAxios(`obras/${idobra}`, { useCache: false });
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [{ loading: loadingSave, error: errorSave },
        executeSave
    ] = useAxios(
        {
            url: `obras${idobra && `/${idobra}`}`,
            method: `${idobra ? 'PUT' : 'POST'}`
        },
        { manual: true }
    );

    const [
        { loading: loadingDelete, error: errorDelete, response: responseDelete },
        executeDelete
    ] = useAxios(
        {
            url: `obras/${idobra}`,
            method: 'DELETE'
        },
        { manual: true }
    )

    const cbSubmit = (values) => {
        executeSave({ data: values });
    };

    if (responseDelete && responseDelete.status === 200) return <Navigate to="/app/obras" replace />;

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
                        Obra
                    </Typography>
                    <Loading />
                </>
                :
                <>
                    <Formik
                        initialValues={data || {}}
                        validationSchema={Yup.object().shape({
                            nome: Yup.string().max(255).required('Nome é obrigatório'),
                            previsao: Yup.date().required('Previsão é obrigatória')
                        })}
                        onSubmit={cbSubmit}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box display="flex">
                                    <Typography
                                        color="textPrimary"
                                        variant="h2"
                                    >
                                        Obra
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
                                <TextField
                                    error={Boolean(touched.nome && errors.nome)}
                                    fullWidth
                                    helperText={touched.nome && errors.nome}
                                    label="Nome"
                                    margin="normal"
                                    name="nome"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.nome}
                                    variant="outlined"
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
                                    variant="outlined"
                                />
                                {error &&
                                    <FormHelperText error>
                                        {error}
                                    </FormHelperText>}
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