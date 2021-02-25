import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { getPlanta, savePlanta } from '../api/api.js';
import {
    TextField,
    Button,
    CssBaseline,
    Paper,
    Typography,
    Grid,
    CardMedia,
    LinearProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SuccessDialog, WarningDialog, ErrorDialog } from '../components/Dialog';
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
    const [warningOpen, setWarningOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [imagem, setImagem] = useState(null);
    const classes = useStyles();

    const { idobra, idprojeto, idplanta } = useParams();
    let history = useHistory();

    const cbSubmit = (inputs) => {
        if (!inputs.planta.id && !inputs.planta.imagem) {
            setWarningOpen(true);
        } else {
            savePlanta({ ...inputs.planta, idprojeto: idprojeto })
                .then(
                    (data) => {
                        if (!idplanta)
                        history.replace('/obra/' + idobra + '/projeto/' + data.idprojeto + '/planta/' + data.id);
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
        }
    };

    const { register, errors, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (idplanta)
            getPlanta(idplanta)
                .then(
                    (data) => {
                        setValue('planta', data);
                    if (data.imagem)
                        setImagem(Buffer.from(data.imagem, 'binary').toString('base64'));
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
    }, [idplanta, setValue]);

    const onDropImagem = (imagens) => {
        setValue('planta.imagem', imagens[0]);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <form
                className={classes.layout}
                onSubmit={e => e.preventDefault()}
                autoComplete="off">

                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Planta
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição"
                                placeholder="Descrição da planta"
                                name="planta.descricao"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                error={errors.planta && errors.planta.descricao ? true : false}
                                helperText={errors.planta && errors.planta.descricao ? errors.planta.descricao.message : null}
                                inputRef={register({
                                    required: "Campo obrigatório"
                                })}
                            />
                        </Grid>
                        {idplanta ? (
                            <Grid item xs={12}>
                                {!imagem ? (
                                    <LinearProgress />
                                ) : (
                                        <CardMedia
                                            alt="Planta"
                                            component="img"
                                            src={`data:image/jpeg;base64,${imagem}`} />
                                    )}
                            </Grid>
                        ) : (
                                <Grid item xs={12}>
                                    <ImageUploader
                                        withIcon={false}
                                        label="Máximo: 200Mb - Extensões: jpg | jpeg | png"
                                        buttonText='Selecionar planta'
                                        name="imagem"
                                        onChange={onDropImagem}
                                        imgExtension={['.jpg', '.jpeg', '.png']}
                                        fileTypeError="não é uma extensão de arquivo suportada"
                                        maxFileSize={200000000}
                                        fileSizeError="excede o tamanho limite"
                                        withPreview
                                        singleImage
                                    />
                                </Grid>
                            )}

                    </Grid>
                    <div className={classes.buttons}>
                        <Button
                            className={classes.button}
                            color="default"
                            component={Link}
                            disabled={!idplanta}
                            to={`/obra/${idobra}/projeto/${idprojeto}/planta/${idplanta}/detalhes`}>Detalhes da planta</Button>
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
                mensagem="Planta salva com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
            <WarningDialog
                mensagem="Selecione a planta."
                open={warningOpen}
                setOpen={setWarningOpen}
            />
            <ErrorDialog
                mensagem={mensagemErro}
                open={errorOpen}
                setOpen={setErrorOpen}
            />
        </React.Fragment>

    );
}