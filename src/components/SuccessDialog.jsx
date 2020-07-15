import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default (props) => {
    const { mensagem, open, setOpen } = props;

    return (
        <Snackbar 
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            open={open} 
            autoHideDuration={4000} 
            onClose={() => setOpen(false)}>
            <MuiAlert 
                elevation={6} 
                variant="filled" 
                onClose={() => setOpen(false)} 
                severity="success"
            >
                {mensagem}
            </MuiAlert>
        </Snackbar>
    );
  };
