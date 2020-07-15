import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
  }));

function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1">Aplicação EngeLive</Typography>
                <Typography variant="body2" color="textSecondary">
                    Direitos autorais © EngeLive
                    {' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;