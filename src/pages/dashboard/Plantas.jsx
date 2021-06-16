import { Helmet } from 'react-helmet';
import { ListaPlantas, Projeto } from 'components/obras';
import { useParams } from "react-router-dom";
import { Container, Box } from '@material-ui/core';

const Plantas = () => {
    const { idobra, idprojeto } = useParams();

    return (
        <>
            <Helmet>
                <title>Plantas | Engelive</title>
            </Helmet>
            <Container>
                <Box p={1}/>
                <Projeto idobra={idobra} idprojeto={idprojeto}/>
                <Box p={1} />
                <ListaPlantas />
            </Container>
        </>
    );
}

export default Plantas;