import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
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

    const { idprojeto } = useParams();
    let history = useHistory();

    const cbSubmit = (inputs) => {
        saveProjeto(inputs.projeto)
            .then(data => {
                if (!idprojeto)
                    history.replace('/projeto/' + data.id);
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao salvar o projeto.');
            });
    };

    const { register, errors, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (idprojeto)
            getProjeto(idprojeto)
                .then(data => {
                    setValue('projeto', data);
                }).catch(resp => {
                    alert(resp.message || 'Ocorreu um erro ao recuperar os dados do projeto.');
                });
    }, [idprojeto, setValue]);

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
                            <TextField
                                label="Nome"
                                placeholder="Nome do projeto"
                                name="projeto.nome"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                error={errors.projeto && errors.projeto.nome ? true : false}
                                helperText={errors.projeto && errors.projeto.nome ? errors.projeto.nome.message : null}
                                inputRef={register({
                                    required: "Campo obrigatório"
                                })}                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Previsão"
                                type="date"
                                name="projeto.previsao"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                fullWidth
                                error={errors.projeto && errors.projeto.previsao ? true : false}
                                helperText={errors.projeto && errors.projeto.previsao ? errors.projeto.previsao.message : null}
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
                            disabled={!idprojeto}
                            to={`/projeto/${idprojeto}/plantas`}>Plantas do projeto</Button>
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
        </React.Fragment>

    );
}