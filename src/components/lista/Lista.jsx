import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { Edit as EditIcon, Folder as FolderIcon } from '@material-ui/icons';

const Lista = ({ rows, loading, columnsModel, onClickRow }) => {
  return (
    <Box p={1}>
      <Box
        component={Paper}
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <List>
          {rows.map(row => (
            <ListItem button key={row.id} component={Link} to={`/app/tipoprojeto/${row.id}`}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={row.nome}
              />
              <ListItemSecondaryAction>
                <IconButton edge="start" aria-label="edit" component={Link} to={`/app/tipoprojeto/${row.id}`} >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Lista;