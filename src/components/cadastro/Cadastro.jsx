import React, { useEffect, useState } from 'react';
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
import { Formik } from 'formik';

const Cadastro = ({ title, controller, id, defaultValues, getFields, validationSchema, redirectAfterDelete }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [{ data, loading, error }, refetch] = useAxios(`${controller}/${id}`, {
        useCache: false,
        manual: true
    });

    const getUrlSave = () => id ? `${controller}/${id}` : controller;

    const [{ loading: loadingSave, error: errorSave },
        executeSave
    ] = useAxios(
        {
            url: getUrlSave(),
            method: `${id ? 'PUT' : 'POST'}`
        },
        { manual: true }
    );

    const [
        { loading: loadingDelete, error: errorDelete, response: responseDelete },
        executeDelete
    ] = useAxios(
        {
            url: `${controller}/${id}`,
            method: 'DELETE'
        },
        { manual: true }
    )

    const cbSubmit = (values) => {
        executeSave({ data: values });
    };

    useEffect(() => {
        if (id) refetch();
    }, [id]);

    if (responseDelete && responseDelete.status === 200) return <Navigate to={redirectAfterDelete} replace />;

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
                        {title}
                    </Typography>
                    <Loading />
                </>
                :
                <>
                    <Formik
                        initialValues={{ ...defaultValues, ...data }}
                        validationSchema={validationSchema}
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
                                        {title}
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
                                    {id &&
                                        <>
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
                                        </>
                                    }
                                </Box>
                                {getFields({ errors, handleBlur, handleChange, touched, values, setFieldValue })}
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

export default Cadastro;