import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { /*useNavigate,*/ useParams } from 'react-router-dom';
import { deleteProjeto } from 'api/api.js';
import { SuccessDialog, ConfirmDialog } from 'components';
import { Link } from "react-router-dom";
import useAxios from 'axios-hooks';
import { ListaProjetos } from 'components/obras';

import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton,
    Typography,
    Box,
    Tooltip,
    CircularProgress
} from '@material-ui/core';

import {
    Folder as FolderIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    ViewList,
    // Backspace,
    AddCircle
} from '@material-ui/icons';

const Projetos = () => {
    const { idobra } = useParams();
    const [{ data, loading, error }, refetch] = useAxios(`obra/${idobra}/projetos`, { useCache: false });

    const [sucessOpen, setSucessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idProjetoExclusao, setIdProjetoExclusao] = useState(null);
    // let navigate = useNavigate();

    const excluirProjeto = () => {
        deleteProjeto(idProjetoExclusao)
            .then(data => {
                // atualizarLista();
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao excluir o projeto.');
            });
    };

    if (loading)
        return <Box
            height='100%'
            width='100%'
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <CircularProgress />
        </Box>;

    if (error)
        return <Box
            height='100%'
            width='100%'
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Typography
                align="center"
                color="textPrimary"
                variant="h3"
            >
                {error}
            </Typography>
        </Box>;

    return (
        <>
            <Helmet>
                <title>Projetos | Engelive</title>
            </Helmet>
            <ListaProjetos/>
            {/* <Box display="flex" padding="2px">
                <Tooltip title="Voltar">
                    <IconButton variant="contained" color="primary" onClick={() => history.goBack()}>
                        <Backspace />
                    </IconButton>
                </Tooltip>
                <Box flexGrow={1} display="flex" justifyContent="center">
                    <Typography variant="h4" color="primary" style={{ paddingTop: '5px' }}>
                        Projetos
                    </Typography>
                </Box>
                <Tooltip title="Novo">
                    <IconButton variant="contained" color="primary" component={Link} to={`/app/obra/${idobra}/projeto`}>
                        <AddCircle fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
            <List>
                {data.map(projeto => (
                    <ListItem button key={projeto.id} component={Link} to={`/app/obra/${idobra}/projeto/${projeto.id}/plantas`}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={projeto.tipos_projeto.nome}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/app/obra/${idobra}/projeto/${projeto.id}/detalhes`} >
                                <ViewList />
                            </IconButton>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/app/obra/${idobra}/projeto/${projeto.id}`} >
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => {
                                setIdProjetoExclusao(projeto.id);
                                setConfirmOpen(true);
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <ConfirmDialog
                titulo="Excluir projeto?"
                mensagem="Tem certeza de que deseja excluir o projeto?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={excluirProjeto}
            />
            <SuccessDialog
                mensagem="Projeto excluído com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            /> */}
        </>
    );
}

export default Projetos;