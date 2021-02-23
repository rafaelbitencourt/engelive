import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listProjetosTiposPorProjeto, deleteProjetoTipo } from '../api/api.js';
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
    const [projetosTipos, setProjetosTipos] = useState([]);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idProjetoTipoExclusao, setIdProjetoTipoExclusao] = useState(null);

    const { idprojeto } = useParams();
    let history = useHistory();

    const atualizarLista = useCallback(() => {
        listProjetosTiposPorProjeto(idprojeto)
            .then(data => {
                setProjetosTipos(data);
            });
    }, [idprojeto]);

    const excluirProjetoTipo = () => {
        deleteProjetoTipo(idProjetoTipoExclusao)
            .then(data => {
                atualizarLista();
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao excluir o tipo.');
            });
    };

    useEffect(() => {
        atualizarLista();
    }, [atualizarLista]);

    return (
        <div>
            <Box display="flex" padding="2px">
                <Tooltip title="Voltar">
                    <IconButton variant="contained" color="primary" onClick={() => history.goBack()}>
                        <Backspace />
                    </IconButton>
                </Tooltip>
                <Box flexGrow={1} display="flex" justifyContent="center">
                    <Typography variant="h4" color="primary" style={{paddingTop: '5px'}}>
                        Projetos tipos
                    </Typography>
                </Box>
                <Tooltip title="Novo">
                    <IconButton variant="contained" color="primary" component={Link} to={`/projeto/${idprojeto}/planta`}>
                        <AddCircle fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </Box>
            <List>
                {projetosTipos.map(projetoTipo => (
                    <ListItem button key={projetoTipo.id} component={Link} to={`/projeto/${idprojeto}/tipo/${projetoTipo.id}/plantas`}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={projetoTipo.descricao}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/projeto/${idprojeto}/tipo/${projetoTipo.id}`} >
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => {
                                setIdProjetoTipoExclusao(projetoTipo.id);
                                setConfirmOpen(true);
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <ConfirmDialog
                titulo="Excluir tipo projeto?"
                mensagem="Tem certeza de que deseja excluir o projeto?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={excluirProjetoTipo}
            />
            <SuccessDialog
                mensagem="Projeto excluído com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
        </div>
    );
}