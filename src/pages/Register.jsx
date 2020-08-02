import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { SuccessDialog } from '../components/Dialog';

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
    const classes = useStyles();

    let history = useHistory();
    const initialValues = {
        usuario: '',
        email: '',
        senha: ''
    }

    const cbSubmit = () => {
        AuthService.register(inputs)
            .then(() => {
                setSucessOpen(true);
                history.replace('/login');                
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao salvar o projeto.');
            });
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
                        Cadastro
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
                                label="E-mail"
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                                value={inputs.email}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Senha"
                                type="password"
                                name="senha"
                                onChange={handleInputChange}
                                value={inputs.senha}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        {/* <Button 
                            className={classes.button} 
                            color="default"
                            component={Link} 
                            disabled={!idprojeto}
                            to={`/projeto/${idprojeto}/plantas`}>Plantas do projeto</Button> */}
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
        </React.Fragment>

    );
}