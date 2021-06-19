import { DetalhesPlanta } from 'components/plantas';
import { Pagina } from 'components';
import { useParams } from "react-router-dom";

const PlantaDetalhes = () => {
    const params = useParams();

    return (
        <Pagina 
            titulo="Visualização planta"
            propsContainer={{ p: 0, height: 1, maxWidth: false }}
        >
            <DetalhesPlanta {...params}/>
        </Pagina>
    );
}

export default PlantaDetalhes;