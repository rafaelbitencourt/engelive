import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { listObras, deleteObra } from '../api/api.js';
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
    AddCircle
} from '@material-ui/icons';

const Obras = () => {
    const [obras, setObras] = useState([]);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idObraExclusao, setIdObraExclusao] = useState(null);

    useEffect(() => {
        atualizarLista();
    }, []);

    const atualizarLista = () => {
        listObras()
            .then(data => {
                setObras(data);
            });
    };

    const excluirObra = () => {
        deleteObra(idObraExclusao)
            .then(data => {
                atualizarLista();
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao excluir a obra.');
            });
    };

    return (
        <div>
            <Helmet>
                <title>Obras | Engelive</title>
            </Helmet>
            <Box display="flex" padding="2px">
                <Box flexGrow={1} paddingLeft="59px" display="flex" justifyContent="center">
                    <Typography variant="h4" color="primary" style={{ paddingTop: '5px' }}>
                        Obras
                    </Typography>
                </Box>
                <Tooltip title="Novo">
                    <IconButton variant="contained" color="primary" component={Link} to="/app/obra">
                        <AddCircle fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
            <List>
                {obras.map(obra => (
                    <ListItem button key={obra.id} component={Link} to={`/app/obra/${obra.id}/projetos`}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={obra.nome}
                            secondary={obra.previsao}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/app/obra/${obra.id}`} >
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => {
                                setIdObraExclusao(obra.id);
                                setConfirmOpen(true);
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <ConfirmDialog
                titulo="Excluir obra?"
                mensagem="Tem certeza de que deseja excluir a obra?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={excluirObra}
            />
            <SuccessDialog
                mensagem="Obra excluída com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
        </div>
    );
}

export default Obras;