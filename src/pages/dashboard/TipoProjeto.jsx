import { Helmet } from 'react-helmet';
import { CadastroTiposProjetos } from 'components/tiposprojetos';
import { useParams } from "react-router-dom";
import { Container, Box } from '@material-ui/core';

const TipoProjeto = () => {
    const { idtipoprojeto } = useParams();

    return (
        <>
            <Helmet>
                <title>Tipo de projeto | Engelive</title>
            </Helmet>
            <Container>
                <Box p={1} />
                <CadastroTiposProjetos idtipoprojeto={idtipoprojeto} />
            </Container>
        </>
    );
}

export default TipoProjeto;