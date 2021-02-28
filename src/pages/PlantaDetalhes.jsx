import React, { useEffect, useState, useCallback, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listDetalhesPorProjeto, getPlanta, getPlantasDetalhes, savePlantasDetalhes, getDetalhe } from '../api/api.js';
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
    Grid
} from '@material-ui/core';
import Image from 'material-ui-image';
import {
    Backspace,
    FilterCenterFocus,
    ZoomOutMap,
    ZoomOut,
    ZoomIn,
    CheckCircle,
    Edit,
    Visibility
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
    const { idprojeto, idplanta } = useParams();
    const [windowWidth, windowHeight] = useWindowSize();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [sucessOpen, setSucessOpen] = useState(false);
    const [cadastroOpen, setCadastroOpen] = useState(false);

    const [imagem, setImagem] = useState(null);
    const [imagemSize, setImagemSize] = useState({});
    const [imagemDetalhe, setImagemDetalhe] = useState(null);

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
    const [saindo, setSaindo] = useState(false);
    const [editando, setEditando] = useState(false);
    const [alteracoesPendentes, setAlteracoesPendentes] = useState(false);
    usePreventWindowUnload(alteracoesPendentes);
    const [plantaDetalhes, setPlantaDetalhes] = useState([]);
    const [plantaDetalhe, setPlantaDetalhe] = useState(null);
    const [detalhes, setDetalhes] = useState([]);
    const [detalhe, setDetalhe] = useState(null);

    const carregarPlantaDetalhes = useCallback(() => {
        getPlantasDetalhes(idplanta)
            .then(data => {
                setPlantaDetalhes(data);
            }).catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao recuperar os detalhes.');
            });
    }, [idplanta]);

    const handleClickImagem = (evt) => {
        if(!editando) return;

        setPlantaDetalhe({
            idplanta: idplanta,
            iddetalhe: null,
            coordenadax: (evt.nativeEvent.layerX - interacao.translation.x) / interacao.scale,
            coordenaday: (evt.nativeEvent.layerY - interacao.translation.y) / interacao.scale
        });
        setDetalhe(null);
        setCadastroOpen(true);
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        setCadastroOpen(false);

        const indexPlantaDetalhesEditar =
            plantaDetalhes.findIndex(item => item.coordenadax === plantaDetalhe.coordenadax && item.coordenaday === plantaDetalhe.coordenaday);

        plantaDetalhe.iddetalhe = detalhe.id;

        var plantaDetalheAux = plantaDetalhes.concat(plantaDetalhe);

        if (indexPlantaDetalhesEditar !== -1) {
            plantaDetalheAux.splice(indexPlantaDetalhesEditar, 1);
        }

        setPlantaDetalhes(plantaDetalheAux);

        if (!alteracoesPendentes) {
            setAlteracoesPendentes(true);
        }
    }

    const handleClickRemover = () => {
        setCadastroOpen(false);

        const indexPlantaDetalhesRemover =
            plantaDetalhes.findIndex(item => item.coordenadax === plantaDetalhe.coordenadax && item.coordenaday === plantaDetalhe.coordenaday);

        if (indexPlantaDetalhesRemover !== -1) {
            var plantaDetalheAux = [...plantaDetalhes];
            plantaDetalheAux.splice(indexPlantaDetalhesRemover, 1);
            setPlantaDetalhes(plantaDetalheAux);

            if (!alteracoesPendentes) {
                setAlteracoesPendentes(true);
            }
        }
    }

    const load = (area) => {

    }

    const clicked = (area) => {
        const plantaDetalhesEditar =
            plantaDetalhes.find(item => item.coordenadax === area.coords[0] && item.coordenaday === area.coords[1]);

        if (plantaDetalhesEditar) {
            setDetalhe(detalhes.find(item => item.id === plantaDetalhesEditar.iddetalhe));

            setPlantaDetalhe(plantaDetalhesEditar);
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
            setSaindo(true);
            setConfirmOpen(true);
        }
    }

    const visualizar = (sairSemSalvar) => {
        if(sairSemSalvar || !alteracoesPendentes) {
            carregarPlantaDetalhes();
            setEditando(false);
            setAlteracoesPendentes(false);
        } else {
            setSaindo(false);
            setConfirmOpen(true);
        }
    }

    const salvar = () => {
        savePlantasDetalhes(idplanta, plantaDetalhes)
            .then(() => {
                setSucessOpen(true);
                setAlteracoesPendentes(false);
            })
            .catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao salvar os detalhes.');
            });
    }

    useEffect(() => {
        setInteracao({ acao: 'ajustar' });
    }, [imagemSize]);

    useEffect(() => {
        listDetalhesPorProjeto(idprojeto)
            .then(data => {
                setDetalhes(data);
            }).catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao recuperar os detalhes.');
            });
    }, [idprojeto]);

    useEffect(() => {
        getPlanta(idplanta)
            .then(data => {
                if (data.imagem) {
                    const bufferPlanta = Buffer.from(data.imagem, 'binary');
                    setImagem(bufferPlanta.toString('base64'));
                    setImagemSize(sizeOf(bufferPlanta));
                    carregarPlantaDetalhes();
                }
            }).catch(resp => {
                alert(resp.message || 'Ocorreu um erro ao recuperar os dados da planta.');
            });
    }, [idplanta, setImagem, carregarPlantaDetalhes]);

    useEffect(() => {
        const areas = [];

        plantaDetalhes.forEach(function (item) {
            var detalhe = detalhes.find(det => det.id === item.iddetalhe);
            areas.push({
                label: detalhe ? detalhe.nome : 'Detalhe não cadastrado.',
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
    }, [plantaDetalhes, detalhes]);

    useEffect(() => {
        setImagemDetalhe(null);
        if (detalhe && detalhe.id)
            getDetalhe(detalhe.id)
                .then(
                    (data) => {
                        if (data.imagem)
                            setImagemDetalhe("data:image/jpeg;base64,"+Buffer.from(data.imagem, 'binary').toString('base64'));
                    },
                    (error) => {
                        alert(error.message || 'Ocorreu um erro ao recuperar os dados da planta.');                        
                    }
                );
    }, [detalhe, setImagemDetalhe]);

    return (
        <div>
            <Box display="flex" padding="2px">
                <Tooltip title="Voltar">
                    <IconButton variant="contained" color="primary" aria-label="Voltar" onClick={() => voltar(false)}>
                        <Backspace />
                    </IconButton>
                </Tooltip>
                <Box flexGrow={1} display="flex" justifyContent="center">
                    { editando ? (
                        <Tooltip title="Modo visualização">
                            <IconButton variant="contained" color="primary" aria-label="Visualizar" onClick={() => visualizar(false)}>
                                <Visibility />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Modo edição">
                            <IconButton variant="contained" color="primary" aria-label="Editar" onClick={() => setEditando(true)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    )}                    
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
                mensagem="Detalhes da planta salvos com sucesso."
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
            <ConfirmDialog
                titulo="Descartar alterações?"
                mensagem="Há alterações não salvas. Deseja descartar?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={() => saindo ? voltar(true) : visualizar(true)}
            />
            <Dialog
                fullWidth
                open={cadastroOpen}
                onClose={() => setCadastroOpen(false)}
                aria-labelledby="form-dialog-title">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <DialogTitle id="form-dialog-title">{(plantaDetalhe && plantaDetalhe.iddetalhe) ? "Alterar detalhe" : "Inserir detalhe"}</DialogTitle>
                    <DialogContent>
                        <Autocomplete
                            value={detalhe}
                            onChange={(event, newValue) => setDetalhe(newValue)}
                            options={detalhes}
                            autoHighlight
                            getOptionLabel={(option) => option.nome}
                            renderOption={(option) => option.nome}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Detalhe"
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
                            <Image
                                aspectRatio={(16/9)}
                                src={imagemDetalhe} 
                            />
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!(plantaDetalhe && plantaDetalhe.iddetalhe) || !editando} onClick={handleClickRemover} variant="contained" color="default">
                            Remover
                        </Button>
                        <Button onClick={() => setCadastroOpen(false)} color="default">
                            Cancelar
                        </Button>
                        <Button disabled={!editando} type="submit" variant="contained" color="primary">
                            {(plantaDetalhe && plantaDetalhe.iddetalhe) ? "Alterar" : "Inserir"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}