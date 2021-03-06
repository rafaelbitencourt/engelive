import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {
    Snackbar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';


const SuccessDialog = (props) => {
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

const WarningDialog = (props) => {
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
                severity="warning"
            >
                {mensagem}
            </MuiAlert>
        </Snackbar>
    );
};

const ErrorDialog = (props) => {
    const { mensagem, open, setOpen } = props;

    return (
        <Snackbar
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            open={open}
            onClose={() => setOpen(false)}>
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={() => setOpen(false)}
                severity="error"
            >
                {mensagem}
            </MuiAlert>
        </Snackbar>
    );
};

const ConfirmDialog = (props) => {
    const { titulo, mensagem, open, setOpen, onConfirm } = props;
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {mensagem}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => setOpen(false)}
                >
                    Não
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}
                    color="primary"
                >
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export {
    SuccessDialog,
    WarningDialog,
    ErrorDialog,
    ConfirmDialog
};