import { Helmet } from 'react-helmet';
import { ListaTiposProjetos } from 'components/tiposprojetos';

const TiposProjetos = () => {
    return (
        <>
            <Helmet>
                <title>Tipos de projetos | Engelive</title>
            </Helmet>
            <ListaTiposProjetos />
        </>
    );
}

export default TiposProjetos;