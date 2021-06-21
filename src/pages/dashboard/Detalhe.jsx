import { Pagina, CadastroDetalhe } from 'components';
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