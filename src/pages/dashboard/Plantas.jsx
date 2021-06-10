import { Helmet } from 'react-helmet';
import { ListaPlantas } from 'components/obras';

const Plantas = () => {
    return (
        <>
            <Helmet>
                <title>Plantas | Engelive</title>
            </Helmet>
            <ListaPlantas />
        </>
    );
}

export default Plantas;