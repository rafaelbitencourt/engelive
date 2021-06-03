import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
// import { useHistory } from 'react-router-dom';
import { listTiposProjetos, deleteTipoProjeto } from 'api/api.js';
import { SuccessDialog, ConfirmDialog } from 'components/Dialog';
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
    // Backspace,
    AddCircle
} from '@material-ui/icons';

const TiposProjetos = () => {
    const [tiposProjetos, setTiposProjetos] = useState([]);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idTipoProjetoExclusao, setIdTipoProjetoExclusao] = useState(null);

    // let history = useHistory();

    useEffect(() => {
        atualizarLista();
    }, []);

    const atualizarLista = () => {
        listTiposProjetos()
            .then(data => {
                setTiposProjetos(data);
            });
    };

    const excluirTipoProjeto = () => {
        deleteTipoProjeto(idTipoProjetoExclusao)
            .then(data => {
                atualizarLista();
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao excluir o tipo de projeto.');
            });
    };

    return (
        <div>
            <Helmet>
                <title>Tipos de projetos | Engelive</title>
            </Helmet>
            <Box display="flex" padding="2px">
                {/* <Tooltip title="Voltar">
                    <IconButton variant="contained" color="primary" onClick={() => history.goBack()}>
                        <Backspace />
                    </IconButton>
                </Tooltip> */}
                <Box flexGrow={1} paddingLeft="59px" display="flex" justifyContent="center">
                    <Typography variant="h4" color="primary" style={{ paddingTop: '5px' }}>
                        Tipos de projetos
                    </Typography>
                </Box>
                <Tooltip title="Novo">
                    <IconButton variant="contained" color="primary" component={Link} to="/app/tipoprojeto">
                        <AddCircle fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
            <List>
                {tiposProjetos.map(tipoProjeto => (
                    <ListItem button key={tipoProjeto.id} component={Link} to={`/app/tipoprojeto/${tipoProjeto.id}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={tipoProjeto.nome}
                        // secondary={projeto.previsao}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/app/tipoprojeto/${tipoProjeto.id}`} >
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => {
                                setIdTipoProjetoExclusao(tipoProjeto.id);
                                setConfirmOpen(true);
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <ConfirmDialog
                titulo="Excluir?"
                mensagem="Tem certeza de que deseja excluir o tipo de projeto?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={excluirTipoProjeto}
            />
            <SuccessDialog
                mensagem="Tipo de projeto excluído com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
        </div>
    );
}

export default TiposProjetos;