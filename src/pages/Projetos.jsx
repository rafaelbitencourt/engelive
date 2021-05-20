import React, { useEffect, useState, useCallback } from 'react';
import { /*useHistory,*/ useParams } from 'react-router-dom';
import { listProjetosPorObra, deleteProjeto } from '../api/api.js';
import { SuccessDialog, ConfirmDialog } from '../components/Dialog';
import { Link } from "react-router-dom";

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
    Tooltip
} from '@material-ui/core';

import {
    Folder as FolderIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    ViewList,
    Backspace,
    AddCircle
} from '@material-ui/icons';

export default () => {
    const [projetos, setProjetos] = useState([]);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idProjetoExclusao, setIdProjetoExclusao] = useState(null);

    const { idobra } = useParams();
    // let history = useHistory();

    const atualizarLista = useCallback(() => {
        listProjetosPorObra(idobra)
            .then(data => {
                setProjetos(data);
            });
    }, [idobra]);

    const excluirProjeto = () => {
        deleteProjeto(idProjetoExclusao)
            .then(data => {
                atualizarLista();
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao excluir o projeto.');
            });
    };

    useEffect(() => {
        atualizarLista();
    }, [atualizarLista]);

    return (
        <div>
            <Box display="flex" padding="2px">
                {/* <Tooltip title="Voltar">
                    <IconButton variant="contained" color="primary" onClick={() => history.goBack()}>
                        <Backspace />
                    </IconButton>
                </Tooltip> */}
                <Box flexGrow={1} display="flex" justifyContent="center">
                    <Typography variant="h4" color="primary" style={{paddingTop: '5px'}}>
                        Projetos
                    </Typography>
                </Box>
                <Tooltip title="Novo">
                    <IconButton variant="contained" color="primary" component={Link} to={`/app/obra/${idobra}/projeto`}>
                        <AddCircle fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </Box>
            <List>
                {projetos.map(projeto => (
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
            />
        </div>
    );
}