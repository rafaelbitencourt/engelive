import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useForm from "../hooks/useForm";
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
import { ErrorDialog } from '../components/Dialog';

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
    const classes = useStyles();

    const [errorOpen, setErrorOpen] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    let history = useHistory();
    const initialValues = {
        usuario: '',
        senha: ''
    }

    const cbSubmit = () => {
        AuthService.login(inputs.usuario, inputs.senha)
            .then(
                () => {
                    history.replace('/projetos');
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

    const { inputs, handleInputChange, handleSubmit } = useForm(initialValues, cbSubmit);

    return (
        <React.Fragment>
            <Header/>
            <form
                className={classes.layout}
                onSubmit={handleSubmit}
                autoComplete="off">

                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Login
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Usuário"
                                name="usuario"
                                onChange={handleInputChange}
                                value={inputs.usuario}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Senha"
                                name="senha"
                                type="password"
                                onChange={handleInputChange}
                                value={inputs.senha}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        <Button
                            className={classes.button}
                            color="default"
                            component={Link}
                            to={`/register`}>Cadastre-se</Button>
                        <Button onClick={() => history.goBack()} className={classes.button}>Voltar</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >Login</Button>
                    </div>
                </Paper>
            </form>
            <ErrorDialog
                mensagem={mensagemErro}
                open={errorOpen}
                setOpen={setErrorOpen}
            />
        </React.Fragment>

    );
}