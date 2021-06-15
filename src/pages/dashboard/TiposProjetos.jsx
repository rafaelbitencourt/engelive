import { Helmet } from 'react-helmet';
import { ListaTiposProjetos } from 'components/tiposprojetos';
import { Container, Box } from '@material-ui/core';

const TiposProjetos = () => {
    return (
        <>
            <Helmet>
                <title>Tipos de projetos | Engelive</title>
            </Helmet>
            <Container>
                <Box p={1} />
                <ListaTiposProjetos />
            </Container>
        </>
    );
}

export default TiposProjetos;