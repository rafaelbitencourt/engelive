import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ConfirmDialog } from 'components';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Folder as FolderIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';
import useAxios from 'axios-hooks';

const ListaItem = ({ row, refetch, deleteMethod, getTextItem, getLinkItem, getLinkEdit }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [
        { data, loading, error, response },
        executeDelete
    ] = useAxios(
        {
            url: `${deleteMethod}/${row.id}`,
            method: 'DELETE'
        },
        { manual: true }
    )

    const excluir = () => {
        executeDelete();
    };

    if(response && refetch) refetch();

    return (
        <>
            <ListItem
                button
                key={row.id}
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
                        <IconButton
                            edge="start"
                            aria-label="edit"
                            component={Link}
                            to={getLinkEdit(row)}
                        >
                            <EditIcon />
                        </IconButton>
                    }
                    {!!deleteMethod &&
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => setConfirmOpen(true)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    }
                </ListItemSecondaryAction>
            </ListItem>
            <ConfirmDialog
                titulo="Excluir?"
                mensagem="Tem certeza de que deseja excluir?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={excluir}
            />
        </>
    );
}

export default ListaItem;