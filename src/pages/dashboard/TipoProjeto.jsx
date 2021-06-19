import { CadastroTiposProjetos } from 'components/tiposprojetos';
import { useParams } from "react-router-dom";
import { Pagina } from 'components';

const TipoProjeto = () => {
    const { idtipoprojeto } = useParams();

    return <Pagina titulo="Tipo de projeto">
        <CadastroTiposProjetos idtipoprojeto={idtipoprojeto} />
    </Pagina>;
}

export default TipoProjeto;