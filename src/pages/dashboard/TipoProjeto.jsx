import { Pagina, CadastroTiposProjetos } from 'components';
import { useParams } from "react-router-dom";

const TipoProjeto = () => {
    const params = useParams();

    return <Pagina titulo="Tipo de projeto">
        <CadastroTiposProjetos {...params} />
    </Pagina>;
}

export default TipoProjeto;