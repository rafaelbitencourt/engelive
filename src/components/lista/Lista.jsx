import React from 'react';
import { Link } from "react-router-dom";
import {
  Paper,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { Edit as EditIcon, Folder as FolderIcon } from '@material-ui/icons';

const Lista = ({ rows, getTextItem, getLinkItem, getLinkEdit }) => {
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
              {!!getLinkEdit &&
                <ListItemSecondaryAction>
                  <IconButton
                    edge="start"
                    aria-label="edit"
                    component={Link}
                    to={getLinkEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              }
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Lista;