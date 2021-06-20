import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

const Grade = ({ rows, loading, columnsModel, onClickRow }) => {
  const classes = useStyles();

  return (
    <Box p={2} height="100%">
      <Box
        component={Paper}
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100%"
      >
        <TableContainer>
          <Table /*stickyHeader*/ className={classes.table} size="medium">
            <TableHead>
              <TableRow>
                {columnsModel.map(column =>
                  <TableCell
                    key={column.id}
                    align={column.numeric ? 'right' : 'left'}
                    padding={column.disablePadding ? 'none' : 'default'}
                    style={column.style}>
                    {column.label}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            {!loading &&
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    onClick={() => { if (onClickRow) onClickRow(row) }}
                    style={onClickRow ? { cursor: 'pointer' } : {}}
                  >
                    {columnsModel.map(column =>
                      <TableCell
                        key={column.id}
                        align={column.numeric ? 'right' : 'left'}
                        padding={column.disablePadding ? 'none' : 'default'}>
                        {row[column.id]}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            }
          </Table>
        </TableContainer>
        <Box flexGrow={1} />
        {loading && <CircularProgress />}
        <Box flexGrow={1} />
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={50}
          rowsPerPage={10}
          page={0}
          onPageChange={() => { }}
        // onChangePage={() => { }}
        // onChangeRowsPerPage={() => { }}
        // count={rows.length}
        // rowsPerPage={rowsPerPage}
        // page={page}
        // onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box >
  );
}

export default Grade;