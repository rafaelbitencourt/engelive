import React, { useEffect, useState } from 'react';
import { listMateriais, deleteMaterial } from '../api/api.js';
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

export default () => {
    const [materiais, setMateriais] = useState([]);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idMaterialExclusao, setIdMaterialExclusao] = useState(null);

    useEffect(() => {
        atualizarLista();
    }, []);

    const atualizarLista = () => {
        listMateriais()
            .then(data => {
                setMateriais(data);
            });
    };

    const excluirMaterial = () => {
        deleteMaterial(idMaterialExclusao)
            .then(data => {
                atualizarLista();
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao excluir o material.');
            });
    };

    return (
        <div>
            <Box display="flex" padding="2px">
                <Box flexGrow={1} paddingLeft="59px" display="flex" justifyContent="center">
                    <Typography variant="h4" color="primary" style={{paddingTop: '5px'}}>
                        Materiais
                    </Typography>
                </Box>
                <Tooltip title="Novo">
                    <IconButton variant="contained" color="primary" component={Link} to="/material">
                        <AddCircle fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </Box>
            <List>
                {materiais.map(material => (
                    <ListItem button key={material.id} component={Link} to={`/material/${material.id}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={material.nome}
                            // secondary={projeto.previsao}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/material/${material.id}`} >
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => {
                                setIdMaterialExclusao(material.id);
                                setConfirmOpen(true);
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <ConfirmDialog
                titulo="Excluir material?"
                mensagem="Tem certeza de que deseja excluir o material?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={excluirMaterial}
            />
            <SuccessDialog 
                mensagem="Material excluído com sucesso."
                open={sucessOpen} 
                setOpen={setSucessOpen}
            />
        </div>
    );
}