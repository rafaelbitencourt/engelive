import { Helmet } from 'react-helmet';
import { Container, Box } from '@material-ui/core';

const Pagina = ({ titulo, children }) =>
    <>
        <Helmet>
            <title>{titulo} | Engelive</title>
        </Helmet>
        <Container component={Box} pt={2} pb={2}>
            {children}
        </Container>
    </>;

export default Pagina;