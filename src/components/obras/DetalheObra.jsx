import {
    Box,
    Typography,
    Paper
} from '@material-ui/core';


import useAxios from 'axios-hooks';
import { Loading, Error } from 'components'

const DetalheObra = ({ idobra }) => {
    const [{ data, loading, error }] = useAxios(`obras/${idobra}`, { useCache: false });

    if (error) return <Error error={error} />

    return (
        <Box
            component={Paper}
            display="flex"
            flexDirection="column"
            height="100%"
            p={2}
        >
            <Typography
                color="textPrimary"
                variant="h1"
            >
                Obra
            </Typography>
            {loading
                ?
                <Loading />
                :
                <>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        Nome: {data.nome}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        Previsão: {data.previsao && new Date(data.previsao).toLocaleDateString()}
                    </Typography>
                </>
            }
        </Box>
    );
}

export default DetalheObra;