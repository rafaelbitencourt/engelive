import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listMateriais, getPlanta, getPlantasMateriais, savePlantasMateriais } from '../api/api.js';
import ImageMapper from '../components/ImageMapper';
import { MapInteraction } from 'react-map-interaction';
import {
    IconButton,
    Tooltip,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@material-ui/core';
import {
    FilterCenterFocus,
    ZoomOutMap,
    ZoomOut,
    ZoomIn
} from '@material-ui/icons';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { SuccessDialog } from '../components/Dialog';
import usePreventWindowUnload from '../hooks/usePreventWindowUnload';
import { useWindowSize } from "@react-hook/window-size/";
import sizeOf from "image-size";

export default () => {
    let history = useHistory();
    const { idplanta } = useParams();
    const [windowWidth, windowHeight] = useWindowSize();
    const minScale = 0.05;
    const maxScale = 2;

    const [sucessOpen, setSucessOpen] = useState(false);
    const [cadastroOpen, setCadastroOpen] = useState(false);

    const [imagem, setImagem] = useState(null);
    const [imagemSize, setImagemSize] = useState({});
    const [interacao, setInteracao] = useState({
        scale: 1,
        translation: { x: 0, y: 0 }
    });
    const [map, setMap] = useState({
        name: "my-map",
        areas: []
    });
    const [alteracoesPendentes, setAlteracoesPendentes] = useState(false);
    usePreventWindowUnload(alteracoesPendentes);
    const [plantaMateriais, setPlantaMateriais] = useState([]);
    const [plantaMaterial, setPlantaMaterial] = useState(null);
    const [materiais, setMateriais] = useState([]);
    const [material, setMaterial] = useState(null);

    const carregarPlantaMateriais = useCallback(() => {
        getPlantasMateriais(idplanta)
            .then(data => {
                setPlantaMateriais(data);
            }).catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao recuperar os materiais.');
            });
    }, [idplanta]);

    const handleClickImagem = (evt) => {
        setPlantaMaterial({
            idplanta: idplanta,
            idmaterial: null,
            coordenadaX: (evt.nativeEvent.layerX - interacao.translation.x) / interacao.scale,
            coordenadaY: (evt.nativeEvent.layerY - interacao.translation.y) / interacao.scale
        });
        setMaterial(null);
        setCadastroOpen(true);
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        setCadastroOpen(false);

        const indexPlantaMateriaisEditar =
            plantaMateriais.findIndex(item => item.coordenadaX === plantaMaterial.coordenadaX && item.coordenadaY === plantaMaterial.coordenadaY);

        plantaMaterial.idmaterial = material.id;

        var plantaMaterialAux = plantaMateriais.concat(plantaMaterial);

        if (indexPlantaMateriaisEditar !== -1) {
            plantaMaterialAux.splice(indexPlantaMateriaisEditar, 1);
        }

        setPlantaMateriais(plantaMaterialAux);

        if (!alteracoesPendentes) {
            setAlteracoesPendentes(true);
        }
    }

    const handleClickRemover = () => {
        setCadastroOpen(false);

        const indexPlantaMateriaisRemover =
            plantaMateriais.findIndex(item => item.coordenadaX === plantaMaterial.coordenadaX && item.coordenadaY === plantaMaterial.coordenadaY);

        if (indexPlantaMateriaisRemover !== -1) {
            var plantaMaterialAux = [...plantaMateriais];
            plantaMaterialAux.splice(indexPlantaMateriaisRemover, 1);
            setPlantaMateriais(plantaMaterialAux);

            if (!alteracoesPendentes) {
                setAlteracoesPendentes(true);
            }
        }
    }

    const load = (area) => {

    }

    const clicked = (area) => {
        const plantaMateriaisEditar =
            plantaMateriais.find(item => item.coordenadaX === area.coords[0] && item.coordenadaY === area.coords[1]);

        if (plantaMateriaisEditar) {
            setMaterial(materiais.find(item => item.id === plantaMateriaisEditar.idmaterial));

            setPlantaMaterial(plantaMateriaisEditar);
            setCadastroOpen(true);
        }
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
                setAlteracoesPendentes(false);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao salvar os materiais.');
            });
    }

    const zoom = (aumentar) => {
        var newScale = interacao.scale + (aumentar ? 0.1 : -0.1);
        newScale = Math.min(newScale, maxScale);
        newScale = Math.max(newScale, minScale);

        const translationX = interacao.translation.x - ((newScale - interacao.scale) * imagemSize.width / 2);
        const translationY = interacao.translation.y - ((newScale - interacao.scale) * imagemSize.height / 2);

        setInteracao({
            scale: newScale,
            translation: {
                x: translationX,
                y: translationY
            }
        });
    };

    const centralizar = (ajustar) => {
        var scale = interacao.scale;
        if (ajustar) {
            const scaleWidth = windowWidth / imagemSize.width;
            const scaleHeight = (windowHeight - 110) / imagemSize.height;
            scale = Math.min(scaleWidth, scaleHeight, maxScale);
            scale = Math.max(scale, minScale);
        }
        const translationX = (windowWidth - (imagemSize.width * scale)) / 2;
        const translationY = (windowHeight - 110 - (imagemSize.height * scale)) / 2;

        setInteracao({
            scale: scale,
            translation: {
                x: translationX,
                y: translationY
            }
        });
    };

    useEffect(() => {
        centralizar(true);
    }, [imagemSize]);

    useEffect(() => {
        listMateriais()
            .then(data => {
                setMateriais(data);
            }).catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao recuperar os materiais.');
            });
    }, [idplanta]);

    useEffect(() => {
        getPlanta(idplanta)
            .then(data => {
                if (data.imagem) {
                    const bufferPlanta = Buffer.from(data.imagem, 'binary');
                    setImagem(bufferPlanta.toString('base64'));
                    setImagemSize(sizeOf(bufferPlanta));
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
                preFillColor: "rgba(255, 255, 255, 0.1)",
                lineWidth: 2
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
            <Button disabled={!alteracoesPendentes} variant="contained" color='primary' onClick={salvar}>Salvar</Button>
            <Tooltip title="Centralizar">
                <IconButton variant="contained" color="primary" aria-label="Centralizar" onClick={() => centralizar()}>
                    <FilterCenterFocus />
                </IconButton>
            </Tooltip>
            <Tooltip title="Ajustar">
                <IconButton variant="contained" color="primary" aria-label="Ajustar" onClick={() => centralizar(true)}>
                    <ZoomOutMap />
                </IconButton>
            </Tooltip>
            <Tooltip title="Zoom -">
                <IconButton disabled={interacao.scale === minScale} variant="contained" color="primary" aria-label="Menos zoom" onClick={() => zoom(false)}>
                    <ZoomOut />
                </IconButton>
            </Tooltip>
            <Tooltip title="Zoom +">
                <IconButton disabled={interacao.scale === maxScale} variant="contained" color="primary" aria-label="Mais zoom" onClick={() => zoom(true)}>
                    <ZoomIn />
                </IconButton>
            </Tooltip>
            <MapInteraction
                value={interacao}
                onChange={(value) => setInteracao(value)}
                minScale={minScale}
                maxScale={maxScale}
            >
                {
                    ({ translation, scale }) => {
                        return <div style={{ height: windowHeight - 110, width: "100%", position: "relative", overflow: "hidden", touchAction: "none", userSelect: "none" }}>
                            <div style={{ display: 'inline-block', transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`, transformOrigin: `0px 0px` }}>
                                <ImageMapper
                                    src={`data:image/jpeg;base64,${imagem}`}
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
            <Dialog
                fullWidth
                open={cadastroOpen}
                onClose={() => setCadastroOpen(false)}
                aria-labelledby="form-dialog-title">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <DialogTitle id="form-dialog-title">{(plantaMaterial && plantaMaterial.idmaterial) ? "Alterar material" : "Inserir material"}</DialogTitle>
                    <DialogContent>
                        <Autocomplete
                            value={material}
                            onChange={(event, newValue) => setMaterial(newValue)}
                            options={materiais}
                            autoHighlight
                            getOptionLabel={(option) => option.nome}
                            renderOption={(option) => option.nome}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Material"
                                    variant="outlined"
                                    required
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                        <TextField
                            label="Descrição"
                            variant="outlined"
                            value={material ? material.descricao : ' '}
                            multiline={true}
                            rows={5}
                            fullWidth
                            disabled
                            style={{ marginTop: 10 }}
                            inputProps={{ style: { color: 'black' } }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!(plantaMaterial && plantaMaterial.idmaterial)} onClick={handleClickRemover} variant="contained" color="default">
                            Remover
                        </Button>
                        <Button onClick={() => setCadastroOpen(false)} color="default">
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {(plantaMaterial && plantaMaterial.idmaterial) ? "Alterar" : "Inserir"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}