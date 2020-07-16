import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPlanta, getPlantasMateriais, savePlantasMateriais } from '../api/api.js';
import ImageMapper from '../components/ImageMapper';
import { MapInteraction } from 'react-map-interaction';
import { Button } from '@material-ui/core';
import SuccessDialog from '../components/SuccessDialog';

export default () => {
    const [sucessOpen, setSucessOpen] = useState(false);
    const { idplanta } = useParams();
    const [imagem, setImagem] = useState(null);
    const [interacao, setInteracao] = useState({
        scale: 1,
        translation: { x: 0, y: 0 }
    });
    let history = useHistory();

    const [map, setMap] = useState({
        name: "my-map",
        areas: []
    });
    const [plantaMateriais, setPlantaMateriais] = useState([]);

    const carregarPlantaMateriais = useCallback(() => {
        getPlantasMateriais(idplanta)
            .then(data => {
                setPlantaMateriais(data);
            }).catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao recuperar os materiais.');
            });
    }, [idplanta]);

    const handleClickImagem = (evt) => {
        setPlantaMateriais(plantaMateriais.concat({
            idplanta: idplanta,
            idmaterial: 2,
            coordenadaX: (evt.nativeEvent.layerX - interacao.translation.x) / interacao.scale,
            coordenadaY: (evt.nativeEvent.layerY - interacao.translation.y) / interacao.scale
        }));
    }

    const load = (area) => {

    }

    const clicked = (area) => {

    }
    const enterArea = (area) => {

    }
    const leaveArea = (area) => {

    }
    const moveOnArea = (area, evt) => {

    }

    const moveOnImage = (evt) => {

    }

    const salvar = () => {
        savePlantasMateriais(idplanta, plantaMateriais)
            .then(() => {
                setSucessOpen(true);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao salvar os materiais.');
            });
    }

    useEffect(() => {
        getPlanta(idplanta)
            .then(data => {
                if (data.imagem) {
                    setImagem(Buffer.from(data.imagem, 'binary').toString('base64'));
                    carregarPlantaMateriais();
                }
            }).catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao recuperar os dados da planta.');
            });
    }, [idplanta, setImagem, carregarPlantaMateriais]);

    useEffect(() => {
        const areas = [];

        plantaMateriais.forEach(function (item) {
            areas.push({
                name: 'marcador',
                shape: "circle",
                coords: [
                    item.coordenadaX,
                    item.coordenadaY,
                    10
                ],
                preFillColor: "blue",
                fillColor: "green"
            });
        });

        setMap({
            name: "my-map",
            areas: areas
        });
    }, [plantaMateriais]);

    return (
        <div>
            <Button onClick={() => history.goBack()}>Voltar</Button>
            <Button variant="contained" color='primary' onClick={salvar}>Salvar</Button>
            <MapInteraction
                value={interacao}
                onChange={(value) => setInteracao(value)}
                minScale={0.3}
                maxScale={2}
                // translationBounds={{
                //     xMin: -1000,
                //     xMax: 1000,
                //     yMin: -500,
                //     yMax: 500
                // }}
            >
                {
                    ({ translation, scale }) => {
                        return <div style={{ height: "70%", maxHeight: "70%", width: "100%", position: "relative", overflow: "hidden", touchAction: "none", userSelect: "none" }}>
                            <div style={{ display: 'inline-block', transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`, transformOrigin: `0px 0px` }}>
                                <ImageMapper
                                    src={`data:image/jpeg;base64,${imagem}`}
                                    height={700}
                                    map={map}
                                    onLoad={load}
                                    onClick={area => clicked(area)}
                                    onMouseEnter={area => enterArea(area)}
                                    onMouseLeave={area => leaveArea(area)}
                                    onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
                                    onImageClick={evt => handleClickImagem(evt)}
                                    onImageMouseMove={evt => moveOnImage(evt)}
                                />
                            </div>
                        </div>
                    }
                }
            </MapInteraction>
            <SuccessDialog
                mensagem="Materiais da planta salvos com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
        </div>
    );
}