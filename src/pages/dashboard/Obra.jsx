import { Helmet } from 'react-helmet';
import { ListaProjetos, CadastroObra } from 'components/obras';
import { useParams } from "react-router-dom";
import { Container, Box } from '@material-ui/core';

const Obra = () => {
    const { idobra } = useParams();

    return (
        <>
            <Helmet>
                <title>Obra | Engelive</title>
            </Helmet>
            <Container>
                <Box p={1} />
                <CadastroObra idobra={idobra} />
                {idobra &&
                    <>
                        <Box p={1} />
                        <ListaProjetos idobra={idobra} />
                    </>
                }
            </Container>
        </>
    );
}

export default Obra;