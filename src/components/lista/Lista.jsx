import React from 'react';
import ListaItem from "./ListaItem";
import {
  Paper,
  Box,
  List
} from '@material-ui/core';

const Lista = ({ rows, deleteMethod, getTextItem, getLinkItem, getLinkEdit }) => {
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
    </Box>
  );
}

export default Lista;