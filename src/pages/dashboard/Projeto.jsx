import { Helmet } from 'react-helmet';
import { ListaPlantas, CadastroProjeto, CadastroObra, ListaDetalhes } from 'components/obras';
import { useParams } from "react-router-dom";
import { Container, Box } from '@material-ui/core';

const Plantas = () => {
    const { idobra, idprojeto } = useParams();

    return (
        <>
            <Helmet>
                <title>Projeto | Engelive</title>
            </Helmet>
            <Container>
                <Box p={1} />
                <CadastroObra idobra={idobra} />
                <Box p={1} />
                <CadastroProjeto idobra={idobra} idprojeto={idprojeto} />
                {idprojeto &&
                    <>
                        <Box p={1} />
                        <ListaPlantas idobra={idobra} idprojeto={idprojeto} />
                        <Box p={1} />
                        <ListaDetalhes idobra={idobra} idprojeto={idprojeto} />
                    </>
                }
            </Container>
        </>
    );
}

export default Plantas;