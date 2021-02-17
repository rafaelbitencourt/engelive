import React, { useEffect, useState, useCallback, useReducer } from 'react';
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
    TextField,
    Box,
    Grid,
    CardMedia
} from '@material-ui/core';
import {
    Backspace,
    FilterCenterFocus,
    ZoomOutMap,
    ZoomOut,
    ZoomIn,
    CheckCircle
} from '@material-ui/icons';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { SuccessDialog, ConfirmDialog } from '../components/Dialog';
import usePreventWindowUnload from '../hooks/usePreventWindowUnload';
import { useWindowSize } from "@react-hook/window-size/";
import sizeOf from "image-size";

const minScale = 0.05;
const maxScale = 2;
const zoom = (aumentar, interacao, imagemSize) => {
    var newScale = interacao.scale + (aumentar ? 0.1 : -0.1);
    newScale = Math.min(newScale, maxScale);
    newScale = Math.max(newScale, minScale);

    const translationX = interacao.translation.x - ((newScale - interacao.scale) * imagemSize.width / 2);
    const translationY = interacao.translation.y - ((newScale - interacao.scale) * imagemSize.height / 2);

    return {
        scale: newScale,
        translation: {
            x: translationX,
            y: translationY
        }
    };
};
const centralizar = (ajustar, interacao, imagemSize, windowWidth, windowHeight) => {
    var scale = interacao.scale;
    if (ajustar) {
        const scaleWidth = windowWidth / imagemSize.width;
        const scaleHeight = (windowHeight - 110) / imagemSize.height;
        scale = Math.min(scaleWidth, scaleHeight, maxScale);
        scale = Math.max(scale, minScale);
    }
    const translationX = (windowWidth - (imagemSize.width * scale)) / 2;
    const translationY = (windowHeight - 110 - (imagemSize.height * scale)) / 2;

    return {
        scale: scale,
        translation: {
            x: translationX,
            y: translationY
        }
    };
};

export default () => {
    let history = useHistory();
    const { idplanta } = useParams();
    const [windowWidth, windowHeight] = useWindowSize();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [cadastroOpen, setCadastroOpen] = useState(false);

    const [imagem, setImagem] = useState(null);
    const [imagemSize, setImagemSize] = useState({});
    const [imagemMaterial, setImagemMaterial] = useState(null);

    const reducer = (state, dados) => {
        switch (dados.acao) {
            case 'menosZoom':
                return zoom(false, state, imagemSize);
            case 'maisZoom':
                return zoom(true, state, imagemSize);
            case 'centralizar':
                return centralizar(false, state, imagemSize, windowWidth, windowHeight);
            case 'ajustar':
                return centralizar(true, state, imagemSize, windowWidth, windowHeight);
            default:
                return dados;
        }
    };

    const [interacao, setInteracao] = useReducer(reducer, {
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
            coordenadax: (evt.nativeEvent.layerX - interacao.translation.x) / interacao.scale,
            coordenaday: (evt.nativeEvent.layerY - interacao.translation.y) / interacao.scale
        });
        setMaterial(null);
        setCadastroOpen(true);
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        setCadastroOpen(false);

        const indexPlantaMateriaisEditar =
            plantaMateriais.findIndex(item => item.coordenadax === plantaMaterial.coordenadax && item.coordenaday === plantaMaterial.coordenaday);

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
            plantaMateriais.findIndex(item => item.coordenadax === plantaMaterial.coordenadax && item.coordenaday === plantaMaterial.coordenaday);

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
            plantaMateriais.find(item => item.coordenadax === area.coords[0] && item.coordenaday === area.coords[1]);

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

    const voltar = (sairSemSalvar) => {
        if(sairSemSalvar || !alteracoesPendentes) {
            history.goBack()
        } else {
            setConfirmOpen(true);
        }
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

    useEffect(() => {
        setInteracao({ acao: 'ajustar' });
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
            var material = materiais.find(mat => mat.id === item.idmaterial);
            areas.push({
                label: material ? material.nome : 'Material não cadastrado.',
                shape: "circle",
                coords: [
                    item.coordenadax,
                    item.coordenaday,
                    20
                ],
                preFillColor: "rgba(255, 255, 255, 0.1)",
                lineWidth: 3
            });
        });

        setMap({
            name: "my-map",
            areas: areas
        });
    }, [plantaMateriais, materiais]);

    useEffect(() => {
        if (material && material.imagem)
            setImagemMaterial(Buffer.from(material.imagem, 'binary').toString('base64'));
        else
            setImagemMaterial(null);
    }, [material, setImagemMaterial]);

    return (
        <div>
            <Box display="flex" padding="2px">
                <Tooltip title="Voltar">
                    <IconButton variant="contained" color="primary" aria-label="Voltar" onClick={() => voltar(false)}>
                        <Backspace />
                    </IconButton>
                </Tooltip>
                <Box flexGrow={1} display="flex" justifyContent="center">
                    <Tooltip title="Centralizar">
                        <IconButton variant="contained" color="primary" aria-label="Centralizar" onClick={() => setInteracao({ acao: 'centralizar' })}>
                            <FilterCenterFocus />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ajustar">
                        <IconButton variant="contained" color="primary" aria-label="Ajustar" onClick={() => setInteracao({ acao: 'ajustar' })}>
                            <ZoomOutMap />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Zoom -">
                        <IconButton disabled={interacao.scale === minScale} variant="contained" color="primary" aria-label="Menos zoom" onClick={() => setInteracao({ acao: 'menosZoom' })}>
                            <ZoomOut />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Zoom +">
                        <IconButton disabled={interacao.scale === maxScale} variant="contained" color="primary" aria-label="Mais zoom" onClick={() => setInteracao({ acao: 'maisZoom' })}>
                            <ZoomIn />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Tooltip title="Salvar">
                    <span>
                        <IconButton disabled={!alteracoesPendentes} variant="contained" color="primary" aria-label="Salvar" onClick={salvar}>
                            <CheckCircle fontSize="large" />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
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
            <ConfirmDialog
                titulo="Sair sem salvar?"
                mensagem="Há alterações não salvas. Sair sem salvar?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={() => voltar(true)}
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
                        <Grid item xs={12}>
                                {imagemMaterial ? (
                                    <CardMedia
                                        alt="Material"
                                        component="img"
                                        src={`data:image/jpeg;base64,${imagemMaterial}`} />
                                    ) : (
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
                                    />)}
                        </Grid>
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