import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { listTiposProjetos, getProjeto, saveProjeto } from '../api/api.js';
import {
    TextField,
    Button,
    CssBaseline,
    Paper,
    Typography,
    Grid
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { SuccessDialog, ErrorDialog } from '../components/Dialog';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default () => {
    const [sucessOpen, setSucessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [tiposProjetos, setTiposProjetos] = useState([]);
    const [tipoProjeto, setTipoProjeto] = useState(null);    
    const classes = useStyles();

    const { idobra, idprojeto } = useParams();
    let navigate = useNavigate();

    const cbSubmit = (inputs) => {
        saveProjeto({ ...inputs.projeto, idobra: idobra, idtipoprojeto: tipoProjeto.id })
            .then(
                (data) => {
                    if (!idprojeto)
                        navigate(`/obra/${data.idobra}/projeto/${data.id}`);
                        
                    setSucessOpen(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMensagemErro(resMessage);
                    setErrorOpen(true);
                }
            );
    };

    const { handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (idprojeto)
            getProjeto(idprojeto)
                .then(
                    (data) => {
                        setValue('projeto', data);
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
    
                        setMensagemErro(resMessage);
                        setErrorOpen(true);
                    }
                );
    }, [idprojeto, setValue]);

    useEffect(() => {
        listTiposProjetos()
            .then(data => {
                setTiposProjetos(data);
            }).catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao recuperar os detalhes.');
            });
    }, [idprojeto]);

    return (
        <React.Fragment>
            <CssBaseline />
            <form
                className={classes.layout}
                onSubmit={e => e.preventDefault()}
                autoComplete="off">

                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Projeto
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Autocomplete
                                value={tipoProjeto}
                                onChange={(event, newValue) => setTipoProjeto(newValue)}
                                options={tiposProjetos}
                                autoHighlight
                                getOptionLabel={(option) => option.nome}
                                renderOption={(option) => option.nome}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tipo"
                                        variant="outlined"
                                        required
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        {/* <Button onClick={() => history.goBack()} className={classes.button}>Voltar</Button> */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleSubmit(cbSubmit)}
                        >Salvar</Button>
                    </div>
                </Paper>
            </form>
            <SuccessDialog
                mensagem="Projeto salvo com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
            <ErrorDialog
                mensagem={mensagemErro}
                open={errorOpen}
                setOpen={setErrorOpen}
            />
        </React.Fragment>

    );
}