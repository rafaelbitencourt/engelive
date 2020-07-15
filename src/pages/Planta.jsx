import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useForm from "../hooks/useForm";
import { getPlanta, savePlanta } from '../api/api.js';
import {
    TextField,
    Button,
    CssBaseline,
    Paper,
    Typography,
    Grid,
    CardMedia
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SuccessDialog from '../components/SuccessDialog';
import ImageUploader from 'react-images-upload';

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
    const [imagem, setImagem] = useState(null);
    const classes = useStyles();

    const { idprojeto, idplanta } = useParams();
    let history = useHistory();
    const initialValues = {
        idprojeto: idprojeto,
        descricao: '',
        imagem: null
    }

    const cbSubmit = () => {
        savePlanta(inputs)
            .then(data => {
                if (!idplanta)
                    history.replace('/projeto/' + data.idprojeto + '/planta/' + data.id);
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao salvar a planta.');
            });
    };

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(initialValues, cbSubmit);

    useEffect(() => {
        if (idplanta)
            getPlanta(idplanta)
                .then(data => {
                    setInputs(data);
                    if (data.imagem)
                        setImagem(Buffer.from(data.imagem, 'binary').toString('base64'));
                }).catch(resp => {
                    alert(resp.message || 'Ocorreu um erro ao recuperar os dados da planta.');
                });
    }, [idplanta, setInputs]);

    const onDropImagem = (imagens) => {
        setInputs({ ...inputs, imagem: imagens[0] });
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <form
                className={classes.layout}
                onSubmit={handleSubmit}
                autoComplete="off">

                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Planta
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Descrição"
                                name="descricao"
                                onChange={handleInputChange}
                                value={inputs.descricao}
                                fullWidth
                            />
                        </Grid>
                        {idplanta ? (
                            <Grid item xs={12}>
                                <CardMedia
                                    alt="Planta"
                                    component="img"
                                    src={`data:image/jpeg;base64,${imagem}`}/>
                            </Grid>
                        ) : (
                                <Grid item xs={12}>
                                    <ImageUploader
                                        withIcon={false}
                                        buttonText='Choose images'
                                        name="imagem"
                                        onChange={onDropImagem}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                    />
                                </Grid>
                            )}

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
                mensagem="Planta salva com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
        </React.Fragment>

    );
}