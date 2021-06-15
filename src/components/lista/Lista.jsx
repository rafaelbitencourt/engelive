import React from 'react';
import ListaItem from "./ListaItem";
import {
  Paper,
  Box,
  List,
  Typography
} from '@material-ui/core';

const Lista = ({ title, rows, deleteMethod, getTextItem, getLinkItem, getLinkEdit }) => {
  return (
    <Box
      component={Paper}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      {title &&
        <Box pt={2} pl={2}>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {title}
          </Typography>
        </Box>
      }
      <List>
        {rows.map(row => (
          <ListaItem
            key={row.id}
            row={row}
            deleteMethod={deleteMethod}
            getTextItem={getTextItem}
            getLinkItem={getLinkItem}
            getLinkEdit={getLinkEdit}
          />
        ))}
      </List>
    </Box>
  );
}

export default Lista;