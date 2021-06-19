import { CadastroPlanta } from 'components/plantas';
import { Pagina } from 'components';
// import { useParams } from "react-router-dom";

const Planta = () => {
    // const { idobra, idprojeto, idplanta } = useParams();

    return (
        <Pagina titulo="Planta">
            <CadastroPlanta />
        </Pagina>
    );
}

export default Planta;