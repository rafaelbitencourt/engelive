import { Helmet } from 'react-helmet';
import { ListaProjetos, Obra } from 'components/obras';
import { useParams } from "react-router-dom";
import { Container, Box } from '@material-ui/core';

const Projetos = () => {
    const { idobra } = useParams();

    return (
        <>
            <Helmet>
                <title>Projetos | Engelive</title>
            </Helmet>
            <Container>
                <Box p={1}/>
                <Obra idobra={idobra} />
                <Box p={1}/>
                <ListaProjetos idobra={idobra} />
            </Container>
        </>
    );
}

export default Projetos;