import { CadastroTiposProjetos } from 'components/tiposprojetos';
import { useParams } from "react-router-dom";
import { Pagina } from 'components';

const TipoProjeto = () => {
    const params = useParams();

    return <Pagina titulo="Tipo de projeto">
        <CadastroTiposProjetos {...params} />
    </Pagina>;
}

export default TipoProjeto;