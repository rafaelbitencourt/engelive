import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthService from '../services/auth.service';
import Header from '../components/Header.jsx';
import {
    TextField,
    Button,
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
    const { register, errors, handleSubmit, watch } = useForm({});
    const senha = useRef({});
    senha.current = watch("senha", "");

    const [sucessOpen, setSucessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const classes = useStyles();

    let history = useHistory();

    const cbSubmit = (inputs) => {
        AuthService.register(inputs)
            .then(
                () => {
                    setSucessOpen(true);
                    history.replace('/login');
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

    return (
        <React.Fragment>
            <Header />
            <form
                className={classes.layout}
                onSubmit={handleSubmit(cbSubmit)}
                autoComplete="off">

                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Cadastro
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Usuário"
                                name="usuario"
                                fullWidth
                                error={errors.usuario ? true : false}
                                helperText={errors.usuario ? errors.usuario.message : null}
                                inputRef={register({
                                    required: "Campo obrigatório"
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="E-mail"
                                name="email"
                                fullWidth
                                error={errors.email ? true : false}
                                helperText={errors.email ? errors.email.message : null}
                                inputRef={register({
                                    required: "Campo obrigatório",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Endereço de e-mail inválido"
                                    }
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Senha"
                                type="password"
                                name="senha"
                                fullWidth
                                error={errors.senha ? true : false}
                                helperText={errors.senha ? errors.senha.message : null}
                                inputRef={register({
                                    required: "Campo obrigatório",
                                    minLength: {
                                        value: 8,
                                        message: "A senha deve ter pelo menos 8 caracteres"
                                    }
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirmação de senha"
                                type="password"
                                name="confirmacaoSenha"
                                error={errors.confirmacaoSenha ? true : false}
                                helperText={errors.confirmacaoSenha ? errors.confirmacaoSenha.message : null}
                                inputRef={register({
                                    validate: value =>
                                        value === senha.current || "As senhas não conferem"
                                })}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        <Button onClick={() => history.goBack()} className={classes.button}>Voltar</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >Salvar</Button>
                    </div>
                </Paper>
            </form>
            <SuccessDialog
                mensagem="Cadastro realizado com sucesso."
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