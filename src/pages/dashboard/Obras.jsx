import { Link } from "react-router-dom";
import {
    Box,
    Grid,
    CircularProgress,
    Typography,
    makeStyles,
    Tooltip,
    IconButton
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { ObraCard } from 'components/obras';
import useAxios from 'axios-hooks';
import { Pagina } from 'components';

const useStyles = makeStyles({
    add: {
        position: "fixed",
        bottom: 0,
        right: 10
    },
});

const Obras = () => {
    const [{ data, loading, error }] = useAxios("obras", { useCache: false });
    const classes = useStyles();

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
        <Pagina titulo="Obras">
            <Box className={classes.add}>
                <Tooltip title="Novo" >
                    <IconButton variant="contained" color="primary" component={Link} to="/app/obra">
                        <AddCircle fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
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
        </Pagina>
    )
};

export default Obras;
