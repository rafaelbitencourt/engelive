import React from 'react';
import { Helmet } from 'react-helmet'
import {
    Container,
    Typography,
    CardMedia,
    Box,
    Grid,
    Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = () => (
    <>
        <Helmet>
            <title>Engelive</title>
        </Helmet>
        <Box
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="md">
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={6}
                        sm={6}
                        xl={6}
                        xs={12}
                    >
                        <CardMedia
                            alt="Planta"
                            component="img"
                            src="/logo.png" />
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        sm={6}
                        xl={6}
                        xs={12}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                justifyContent: 'center'
                            }}
                        >
                            <Grid
                                container
                                spacing={2}
                                direction="column"
                            >
                                <Grid item>
                                    <Typography
                                        color="textPrimary"
                                        variant="engelive"
                                    >
                                        EngeLive
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        Seu projeto na palma da sua mão
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        size="large"
                                        variant="contained"
                                        component={Link}
                                        to={'/login'}
                                    >
                                        Entrar
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        size="large"
                                        variant="contained"
                                        component={Link}
                                        to={'/register'}
                                    >
                                        Criar conta
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container >
        </Box>
    </>
);

export default Home;