import { Helmet } from 'react-helmet';
import { Container, Box } from '@material-ui/core';

const Pagina = ({ titulo, children, propsContainer }) =>
    <>
        <Helmet>
            <title>{titulo ? `${titulo} | ` : ''}Engelive</title>
        </Helmet>
        <Container component={Box} pt={2} pb={2} {...propsContainer}>
            {children}
        </Container>
    </>;

export default Pagina;