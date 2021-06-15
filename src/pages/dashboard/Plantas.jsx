import { Helmet } from 'react-helmet';
import { ListaPlantas } from 'components/obras';
import { Container, Box } from '@material-ui/core';

const Plantas = () => {
    return (
        <>
            <Helmet>
                <title>Plantas | Engelive</title>
            </Helmet>
            <Container>
                <Box p={1} />
                <ListaPlantas />
            </Container>
        </>
    );
}

export default Plantas;