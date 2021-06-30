import React from 'react';
import useAxios from 'axios-hooks';
import { Loading, Error } from 'components';
import DetalhesPlantaInteracao from './DetalhesPlantaInteracao';

const DetalhesPlanta = (props) => {

    const [{ data: plantaDetalhes, loading: loadingPlantaDetalhes, error: errorPlantaDetalhes }, refetchPlantaDetalhes] = useAxios(`plantas_detalhes/${props.idplanta}`, {
        useCache: false
    });

    const [{ data: planta, loading: loadingPlanta, error: errorPlanta }] = useAxios(`plantas/${props.idplanta}`, {
        useCache: false
    });

    if (loadingPlantaDetalhes || loadingPlanta) return <Loading />

    if (errorPlanta) return <Error error={errorPlanta} />
    if (errorPlantaDetalhes) return <Error error={errorPlantaDetalhes} />

    return (
        <DetalhesPlantaInteracao 
            {...props}
            planta={planta}
            inicialPlantaDetalhes={plantaDetalhes}
            refetchPlantaDetalhes={refetchPlantaDetalhes}
        />
    );
}

export default DetalhesPlanta;