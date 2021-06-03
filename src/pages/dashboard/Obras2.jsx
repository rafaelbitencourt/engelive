import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid,
    Pagination,
    CircularProgress,
    Typography
} from '@material-ui/core';
import ObraCard from 'components/obras/ObraCard';
import useAxios from 'axios-hooks';

const Obras = () => {
    const [{ data, loading, error }, refetch] = useAxios("obras", { useCache: false });

    if (loading)
        return <Box
            height='100%'
            width='100%'
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <CircularProgress />
        </Box>;

    if (error)
        return <Box
            height='100%'
            width='100%'
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Typography
                align="center"
                color="textPrimary"
                variant="h3"
            >
                {error}
            </Typography>
        </Box>;

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
                            {data.map((obra) => (
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
