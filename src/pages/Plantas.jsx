import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listPlantasPorProjeto, deletePlanta } from '../api/api.js';
import { SuccessDialog, ConfirmDialog } from '../components/Dialog';
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
    const [plantas, setPlantas] = useState([]);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idPlantaExclusao, setIdPlantaExclusao] = useState(null);

    const { idprojeto } = useParams();
    let history = useHistory();

    const atualizarLista = useCallback(() => {
        listPlantasPorProjeto(idprojeto)
            .then(data => {
                setPlantas(data);
            });
    }, [idprojeto]);

    const excluirPlanta = () => {
        deletePlanta(idPlantaExclusao)
            .then(data => {
                atualizarLista();
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao excluir a planta.');
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
                        Plantas
                    </Typography>
                </Box>
                <Tooltip title="Novo">
                    <IconButton variant="contained" color="primary" component={Link} to={`/projeto/${idprojeto}/planta`}>
                        <AddCircle fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </Box>
            <List>
                {plantas.map(planta => (
                    <ListItem button key={planta.id} component={Link} to={`/projeto/${idprojeto}/planta/${planta.id}/materiais`}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={planta.descricao}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/projeto/${idprojeto}/planta/${planta.id}`} >
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => {
                                setIdPlantaExclusao(planta.id);
                                setConfirmOpen(true);
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <ConfirmDialog
                titulo="Excluir planta?"
                mensagem="Tem certeza de que deseja excluir a planta?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={excluirPlanta}
            />
            <SuccessDialog
                mensagem="Planta excluída com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
        </div>
    );
}