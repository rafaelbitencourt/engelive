import { Link } from "react-router-dom";

import {
    IconButton,
    Box,
    Tooltip,
    Typography,
    Paper
} from '@material-ui/core';


import { AddCircle } from '@material-ui/icons';
import useAxios from 'axios-hooks';
import Lista from 'components/lista/Lista'
import { Loading, Error } from 'components'

const ListaCadastro = ({ title, getMethod, deleteMethod, linkNew, getTextItem, getLinkItem, getLinkEdit }) => {
    const [{ data, loading, error }, refetch] = useAxios(getMethod, { useCache: false });

    const getContent = () => {
        if (loading) return <Loading />;

        if (error) return <Error error={error} />

        if (!data?.length)
            return <Typography
                align="center"
                variant="h3"
            >
                Não há registros
            </Typography>

        return <>
            <Lista
                rows={data}
                deleteMethod={deleteMethod}
                getTextItem={getTextItem}
                getLinkItem={getLinkItem}
                getLinkEdit={getLinkEdit}
            />
        </>
    }

    return (
        <Box
            component={Paper}
            display="flex"
            flexDirection="column"
            height="100%"
            pb={1}
        >
            <Box
                pl={2}
                pt={1}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography
                    variant="h3"
                >
                    {title}
                </Typography>
                <Tooltip
                    title="Novo"
                >
                    <IconButton
                        variant="contained"
                        component={Link}
                        to={linkNew}
                    >
                        <AddCircle />
                    </IconButton>
                </Tooltip>
            </Box>
            {getContent()}
        </Box>
    );
}

export default ListaCadastro;