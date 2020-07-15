import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useForm from "../hooks/useForm";
import { getProjeto, saveProjeto } from '../api/api.js';
import {
    TextField,
    Button,
    CssBaseline,
    Paper,
    Typography,
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SuccessDialog from '../components/SuccessDialog';

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

    const { idprojeto } = useParams();
    let history = useHistory();
    const initialValues = {
        nome: '',
        previsao: ''
    }

    const cbSubmit = () => {
        saveProjeto(inputs)
            .then(data => {
                if (!idprojeto)
                    history.replace('/projeto/' + data.id);
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao salvar o projeto.');
            });
    };

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(initialValues, cbSubmit);

    useEffect(() => {
        if (idprojeto)
            getProjeto(idprojeto)
                .then(data => {
                    setInputs(data);
                }).catch(resp => {
                    alert(resp.message || 'Ocorreu um erro ao recuperar os dados do projeto.');
                });
    }, [idprojeto, setInputs]);

    return (
        <React.Fragment>
            <CssBaseline />
            <form
                className={classes.layout}
                onSubmit={handleSubmit}
                autoComplete="off">

                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Projeto
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Nome"
                                name="nome"
                                onChange={handleInputChange}
                                value={inputs.nome}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Previsão"
                                type="date"
                                name="previsao"
                                onChange={handleInputChange}
                                value={inputs.previsao}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        <Button 
                            className={classes.button} 
                            color="default"
                            component={Link} 
                            disabled={!idprojeto}
                            to={`/projeto/${idprojeto}/plantas`}>Plantas do projeto</Button>
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
                mensagem="Projeto salvo com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
        </React.Fragment>

    );
}