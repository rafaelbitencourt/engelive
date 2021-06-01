import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid,
    Pagination
} from '@material-ui/core';
// import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ObraCard from '../components/obras/ObraCard';
import { listObras, deleteObra } from '../api/api.js';

const Obras = () => {
    const [obras, setObras] = useState([]);

    useEffect(() => {
        atualizarLista();
        return () => setObras([]);
    }, []);

    const atualizarLista = () => {
        listObras()
            .then(data => {
                setObras(data);
            });
    };

    return (
        <>
            <Helmet>
                <title>Obras | Engelive</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    {/* <ProductListToolbar /> */}
                    <Box sx={{ pt: 3 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            {obras.map((obra) => (
                                <Grid
                                    item
                                    key={obra.id}
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >
                                    <ObraCard obra={obra} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {/* <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 3
                        }}
                    >
                        <Pagination
                            color="primary"
                            count={3}
                            size="small"
                        />
                    </Box> */}
                </Container>
            </Box>
        </>
    )
};

export default Obras;
