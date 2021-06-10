import { Helmet } from 'react-helmet';
import { ListaProjetos } from 'components/obras';

const Projetos = () => {
    return (
        <>
            <Helmet>
                <title>Projetos | Engelive</title>
            </Helmet>
            <ListaProjetos />
        </>
    );
}

export default Projetos;