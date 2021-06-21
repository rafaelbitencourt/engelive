import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useNotification } from 'context';

const Cadastro = ({ title, controller, id, defaultValues, getFields, validationSchema, redirectAfterDelete }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { setSuccess } = useNotification();
    let navigate = useNavigate();

    const [{ data, loading, error }, refetch] = useAxios(`${controller}/${id}`, {
        useCache: false,
        manual: true
    });

    const getUrlSave = () => id ? `${controller}/${id}` : controller;

    const [{ loading: loadingSave, response: responseSave },
        executeSave
    ] = useAxios(
        {
            url: getUrlSave(),
            method: `${id ? 'PUT' : 'POST'}`
        },
        { manual: true }
    );

    const [
        { loading: loadingDelete, response: responseDelete },
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
    }, [id, refetch]);

    useEffect(() => {
        if (responseSave && responseSave.status === 200) {
            setSuccess("Registro salvo com sucesso.");
            if(!id) navigate(`${responseSave.data.id}`, { replace: true });
        }
    }, [responseSave, setSuccess, id, navigate]);

    useEffect(() => {
        if (responseDelete && responseDelete.status === 200) {
            setSuccess("Registro removido com sucesso.");
            navigate(redirectAfterDelete, { replace: true });
        }
    }, [responseDelete, setSuccess, id, navigate]);

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