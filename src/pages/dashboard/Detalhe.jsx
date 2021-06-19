import { CadastroDetalhe } from 'components/detalhes';
import { Pagina } from 'components';
// import { useParams } from "react-router-dom";

const Detalhe = () => {
    // const { idobra, idprojeto, idplanta } = useParams();

    return (
        <Pagina titulo="Detalhe">
            <CadastroDetalhe />
        </Pagina>
    );
}

export default Detalhe;