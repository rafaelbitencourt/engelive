import React, { useEffect, useState } from 'react';
import { listProjetos, deleteProjeto } from '../api/api.js';
import ConfirmDialog from '../components/ConfirmDialog';
import SuccessDialog from '../components/SuccessDialog';
import { Link } from "react-router-dom";

import {
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton,
    Typography
} from '@material-ui/core';

import {
    Folder as FolderIcon,
    Delete as DeleteIcon,
    Edit as EditIcon
} from '@material-ui/icons';

export default () => {
    const [projetos, setProjetos] = useState([]);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idProjetoExclusao, setIdProjetoExclusao] = useState(null);

    useEffect(() => {
        atualizarLista();
    }, []);

    const atualizarLista = () => {
        listProjetos()
            .then(data => {
                setProjetos(data);
            });
    };

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

    return (
        <div>
            <Typography component="h1" variant="h4" align="center">
                PROJETOS
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/projeto">Novo</Button>
            <List>
                {projetos.map(projeto => (
                    <ListItem button key={projeto.id} component={Link} to={`/projeto/${projeto.id}/plantas`}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={projeto.nome}
                            secondary={projeto.previsao}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/projeto/${projeto.id}`} >
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