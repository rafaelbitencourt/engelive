import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { getDetalhe, saveDetalhe } from 'api/api.js';
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
import { SuccessDialog, WarningDialog, ErrorDialog } from 'components';
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

const CadastroDetalhe = ({ idobra, idprojeto, iddetalhe }) => {
    const [errorOpen, setErrorOpen] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [sucessOpen, setSucessOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);
    const [imagem, setImagem] = useState(null);
    const classes = useStyles();
    let navigate = useNavigate();

    const cbSubmit = (inputs) => {
        if (!inputs.detalhe.id && !inputs.detalhe.imagem) {
            setWarningOpen(true);
        } else {
            saveDetalhe({ ...inputs.detalhe, idprojeto: idprojeto })
                .then(
                    (data) => {
                        if (!iddetalhe)
                            navigate(`/app/obra/${idobra}/projeto/${data.idprojeto}/detalhe/${data.id}`);
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
        if (iddetalhe)
            getDetalhe(iddetalhe)
                .then(
                    (data) => {
                        setValue('detalhe', data);
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
    }, [iddetalhe, setValue]);

    const onDropImagem = (imagens) => {
        setValue('detalhe.imagem', imagens[0]);
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
                        Detalhes
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                placeholder="Nome do detalhe"
                                name="detalhe.nome"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                error={errors.detalhe && errors.detalhe.nome ? true : false}
                                helperText={errors.detalhe && errors.detalhe.nome ? errors.detalhe.nome.message : null}
                                inputRef={register({
                                    required: "Campo obrigatório"
                                })}
                            />
                        </Grid>
                        {iddetalhe ? (
                            <Grid item xs={12}>
                                {!imagem ? (
                                    <LinearProgress />
                                ) : (
                                        <CardMedia
                                            alt="Detalhe"
                                            component="img"
                                            src={`data:image/jpeg;base64,${imagem}`} />
                                    )}
                            </Grid>
                        ) : (
                                <Grid item xs={12}>
                                    <ImageUploader
                                        withIcon={false}
                                        label="Máximo: 200Mb - Extensões: jpg | jpeg | png"
                                        buttonText='Selecionar imagem'
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
                mensagem="Detalhe salvo com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
            <WarningDialog
                mensagem="Selecione uma imagem."
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

export default CadastroDetalhe;