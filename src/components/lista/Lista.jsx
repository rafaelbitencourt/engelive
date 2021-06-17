import React from 'react';
import ListaItem from "./ListaItem";
import {
  Box,
  List,
  Typography
} from '@material-ui/core';

const Lista = ({ title, rows, deleteMethod, getTextItem, getLinkItem, getLinkEdit }) => {
  return (
    <>
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
    </>
  );
}

export default Lista;