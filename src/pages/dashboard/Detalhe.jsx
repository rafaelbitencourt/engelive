import { CadastroDetalhe } from 'components/detalhes';
import { Pagina } from 'components';
import { useParams } from "react-router-dom";

const Detalhe = () => {
    const params = useParams();

    return (
        <Pagina titulo="Detalhe">
            <CadastroDetalhe {...params} />
        </Pagina>
    );
}

export default Detalhe;