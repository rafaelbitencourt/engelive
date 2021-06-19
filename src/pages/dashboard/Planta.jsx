import { CadastroPlanta } from 'components/plantas';
import { Pagina } from 'components';
import { useParams } from "react-router-dom";

const Planta = () => {
    const params = useParams();

    return (
        <Pagina titulo="Planta">
            <CadastroPlanta {...params}/>
        </Pagina>
    );
}

export default Planta;