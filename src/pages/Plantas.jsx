import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listPlantasPorProjeto, deletePlanta } from '../api/api.js';
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
            <Typography component="h1" variant="h4" align="center">
                Plantas
            </Typography>
            <Button onClick={() => history.goBack()}>Voltar</Button>
            <Button variant="contained" color="primary" component={Link} to={`/projeto/${idprojeto}/planta`}>Novo</Button>
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