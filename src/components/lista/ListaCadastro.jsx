import { Link } from "react-router-dom";

import {
    IconButton,
    Box,
    Tooltip,
    Container,
    makeStyles,
    Typography,
    Button
} from '@material-ui/core';


import { AddCircle } from '@material-ui/icons';
import useAxios from 'axios-hooks';
import Lista from 'components/lista/Lista'
import { Loading, Error } from 'components'

const useStyles = makeStyles({
    add: {
        position: "fixed",
        bottom: 0,
        right: 10
    },
});

const ListaCadastro = ({ title, getMethod, deleteMethod, linkNew, getTextItem, getLinkItem, getLinkEdit }) => {
    const [{ data, loading, error }, refetch] = useAxios(getMethod, { useCache: false });
    const classes = useStyles();

    if (loading) return <Loading />;

    if (error) return <Error error={error} />

    if (!data || data.length === 0)
        return <Box
            height='100%'
            width='100%'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Typography
                align="center"
                color="textPrimary"
                variant="h3"
            >
                Não há registros
            </Typography>
            <Box p={1} />
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to={linkNew}
            >
                Novo
            </Button>
        </Box>;

    return (
        <>
            <Box className={classes.add}>
                <Tooltip title="Novo" >
                    <IconButton variant="contained" color="primary" component={Link} to={linkNew}>
                        <AddCircle fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Lista
                rows={data}
                title={title}
                deleteMethod={deleteMethod}
                getTextItem={getTextItem}
                getLinkItem={getLinkItem}
                getLinkEdit={getLinkEdit}
            />
        </>
    );
}

export default ListaCadastro;