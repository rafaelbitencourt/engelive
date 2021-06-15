import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNotification } from 'context';
import { ConfirmDialog } from 'components';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    CircularProgress,
    Tooltip
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Folder as FolderIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';
import useAxios from 'axios-hooks';

const ListaItem = ({ row, deleteMethod, getTextItem, getLinkItem, getLinkEdit }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { setError } = useNotification();

    const [
        { loading, error, response },
        executeDelete
    ] = useAxios(
        {
            url: `${deleteMethod}/${row.id}`,
            method: 'DELETE'
        },
        { manual: true }
    )

    useEffect(() => {
        if (!!error)
            setError("Ocorreu um erro ao tentar excluir");
    }, [error, setError]);

    if (response && response.status === 200) return null;

    return (
        <>
            <ListItem
                button
                component={Link}
                to={getLinkItem(row)}
            >
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={getTextItem(row)}
                />
                <ListItemSecondaryAction>
                    {!!getLinkEdit &&
                        <Tooltip title="Editar">
                            <IconButton
                                edge="start"
                                aria-label="edit"
                                component={Link}
                                to={getLinkEdit(row)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    {!!deleteMethod &&
                        <>
                            {
                                (loading || response?.status === 200)
                                    ?
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <CircularProgress size={24} />
                                    </IconButton>
                                    :
                                    <Tooltip title="Excluir">
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => setConfirmOpen(true)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                        </>
                    }
                </ListItemSecondaryAction>
            </ListItem>
            <ConfirmDialog
                titulo="Excluir?"
                mensagem="Tem certeza de que deseja excluir?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={executeDelete}
            />
        </>
    );
}

export default ListaItem;