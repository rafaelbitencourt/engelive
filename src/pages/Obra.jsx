import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { getObra, saveObra } from '../api/api.js';
import {
    TextField,
    Button,
    CssBaseline,
    Paper,
    Typography,
    Grid
} from '@material-ui/core';
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
    const [errorOpen, setErrorOpen] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [sucessOpen, setSucessOpen] = useState(false);
    const classes = useStyles();

    const { idobra } = useParams();
    let history = useHistory();

    const cbSubmit = (inputs) => {
        saveObra(inputs.obra)
            .then(
                (data) => {
                    if (!idobra)
                        history.replace('/obra/' + data.id);
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

    const { register, errors, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (idobra)
            getObra(idobra)
                .then(
                    (data) => {
                        setValue('obra', data);
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
    }, [idobra, setValue]);

    return (
        <React.Fragment>
            <CssBaseline />
            <form
                className={classes.layout}
                onSubmit={e => e.preventDefault()}
                autoComplete="off">

                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Obra
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                placeholder="Nome da obra"
                                name="obra.nome"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                error={errors.obra && errors.obra.nome ? true : false}
                                helperText={errors.obra && errors.obra.nome ? errors.obra.nome.message : null}
                                inputRef={register({
                                    required: "Campo obrigatório"
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Previsão"
                                type="date"
                                name="obra.previsao"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                fullWidth
                                error={errors.obra && errors.obra.previsao ? true : false}
                                helperText={errors.obra && errors.obra.previsao ? errors.obra.previsao.message : null}
                                inputRef={register({
                                    required: "Campo obrigatório"
                                })}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        <Button
                            className={classes.button}
                            color="default"
                            component={Link}
                            disabled={!idobra}
                            to={`/obra/${idobra}/projetos`}>Projetos da obra</Button>
                        <Button onClick={() => history.goBack()} className={classes.button}>Voltar</Button>
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