import React, { useEffect, useState, useCallback } from 'react';
import { /*useHistory,*/ useParams } from 'react-router-dom';
import { listDetalhesPorProjeto, deleteDetalhe } from '../api/api.js';
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
    Backspace,
    AddCircle
} from '@material-ui/icons';

export default () => {
    const [detalhes, setDetalhes] = useState([]);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idDetalheExclusao, setIdDetalheExclusao] = useState(null);

    const { idobra, idprojeto } = useParams();
    // let history = useHistory();

    const atualizarLista = useCallback(() => {
        listDetalhesPorProjeto(idprojeto)
            .then(data => {
                setDetalhes(data);
            });
    }, [idprojeto]);

    const excluirDetalhe = () => {
        deleteDetalhe(idDetalheExclusao)
            .then(data => {
                atualizarLista();
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao excluir o detalhe.');
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
                <Box flexGrow={1} paddingLeft="59px" display="flex" justifyContent="center">
                    <Typography variant="h4" color="primary" style={{ paddingTop: '5px' }}>
                        Detalhes
                    </Typography>
                </Box>
                <Tooltip title="Novo">
                    <IconButton variant="contained" color="primary" component={Link} to={`/app/obra/${idobra}/projeto/${idprojeto}/detalhe/`}>
                        <AddCircle fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
            <List>
                {detalhes.map(detalhe => (
                    <ListItem button key={detalhe.id} component={Link} to={`/app/obra/${idobra}/projeto/${idprojeto}/detalhe/${detalhe.id}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={detalhe.nome}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/app/obra/${idobra}/projeto/${idprojeto}/detalhe/${detalhe.id}`} >
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => {
                                setIdDetalheExclusao(detalhe.id);
                                setConfirmOpen(true);
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <ConfirmDialog
                titulo="Excluir detalhe?"
                mensagem="Tem certeza de que deseja excluir o detalhe?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={excluirDetalhe}
            />
            <SuccessDialog
                mensagem="Detalhe excluído com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
        </div>
    );
}