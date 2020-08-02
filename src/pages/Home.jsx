import React from 'react';
import {
    Container,
    Typography,
    CardMedia
} from '@material-ui/core';
import Header from '../components/Header.jsx';

export default () => {
    return (
        <React.Fragment>
            <Header showLoginRegister/>
            <Container maxWidth="xs">
                <CardMedia
                    alt="Planta"
                    component="img"
                    src="/logo.png" />
                <Typography component="h1" variant="h3" align="center">
                    EngeLive
            </Typography>
            </Container >
        </React.Fragment>
    );
}