import { DetalhesPlanta } from 'components/plantas';
import { Pagina } from 'components';
// import { useParams } from "react-router-dom";

const PlantaDetalhes = () => {
    // const { idobra, idprojeto, idplanta } = useParams();

    return (
        <Pagina 
            titulo="Visualização planta"
            propsContainer={{ p: 0, height: 1, maxWidth: false }}
        >
            <DetalhesPlanta />
        </Pagina>
    );
}

export default PlantaDetalhes;