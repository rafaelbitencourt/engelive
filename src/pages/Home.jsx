import React from 'react';
import {
    Container,
    Typography,
    CardMedia
} from '@material-ui/core';

export default () => {
    return (
        <Container maxWidth="xs">
            <CardMedia
                alt="Planta"
                component="img"
                src="/logo.png" />
            <Typography component="h1" variant="h3" align="center">
                EngeLive
            </Typography>
        </Container >
    );
}