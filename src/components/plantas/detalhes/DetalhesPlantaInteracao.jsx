import React, { useRef, useEffect, useState, useReducer } from 'react';
import { listDetalhesPorProjeto, savePlantasDetalhes, getDetalhe } from 'api/api.js';
import DetalhesPlantaMapper from './DetalhesPlantaMapper';
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
    Container,
    Hidden
} from '@material-ui/core';
import Image from 'material-ui-image';
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import {
    FilterCenterFocus,
    ZoomOutMap,
    ZoomOut,
    ZoomIn,
    Save,
    Edit,
    Visibility
} from '@material-ui/icons';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { SuccessDialog, ConfirmDialog } from 'components';
import { usePreventWindowUnload } from 'hooks';
import { useWindowSize } from "@react-hook/window-size/";
import sizeOf from "image-size";
import DetalhesPlantaCadastro from "./DetalhesPlantaCadastro";

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
        const scaleHeight = windowHeight / imagemSize.height;
        scale = Math.min(scaleWidth, scaleHeight, maxScale);
        scale = Math.max(scale, minScale);
    }
    const translationX = (windowWidth - (imagemSize.width * scale)) / 2;
    const translationY = (windowHeight - (imagemSize.height * scale)) / 2;

    return {
        scale: scale,
        translation: {
            x: translationX,
            y: translationY
        }
    };
};

const DetalhesPlantaInteracao = ({ idprojeto, idplanta, planta, inicialPlantaDetalhes, refetchPlantaDetalhes }) => {
    // let history = useHistory();
    const [windowWidth, windowHeight] = useWindowSize();
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
                return centralizar(false, state, imagemSize, dimensions.width, dimensions.height);
            case 'ajustar':
                return centralizar(true, state, imagemSize, dimensions.width, dimensions.height);
            default:
                return dados;
        }
    };

    const [interacao, setInteracao] = useReducer(reducer, {
        scale: 1,
        translation: { x: 0, y: 0 }
    });

    const [map, setMap] = useState([]);
    const [saindo, setSaindo] = useState(false);
    const [editando, setEditando] = useState(false);
    const [alteracoesPendentes, setAlteracoesPendentes] = useState(false);
    usePreventWindowUnload(alteracoesPendentes);
    const [plantaDetalhes, setPlantaDetalhes] = useState(inicialPlantaDetalhes);
    const [plantaDetalhe, setPlantaDetalhe] = useState(null);
    const [detalhes, setDetalhes] = useState([]);
    const [detalhe, setDetalhe] = useState(null);

    const handleClickImagem = (coords) => {
        if (!editando) return;

        setPlantaDetalhe({
            idplanta: idplanta,
            iddetalhe: null,
            coordenadax: coords.x,
            coordenaday: coords.y
        });
        // setDetalhe(null);
        setCadastroOpen(true);
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        setCadastroOpen(false);
        debugger;
        const indexPlantaDetalhesEditar =
            plantaDetalhes.findIndex(item => item.coordenadax === plantaDetalhe.coordenadax && item.coordenaday === plantaDetalhe.coordenaday);

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

    const clicked = (area) => {
        const plantaDetalhesEditar =
            plantaDetalhes.find(item => item.coordenadax === area.coords[0] && item.coordenaday === area.coords[1]);

        if (plantaDetalhesEditar) {
            setDetalhe(detalhes.find(item => item.id === plantaDetalhesEditar.iddetalhe));

            setPlantaDetalhe(plantaDetalhesEditar);
            setCadastroOpen(true);
        }
    }

    const voltar = (sairSemSalvar) => {
        if (sairSemSalvar || !alteracoesPendentes) {
            // history.goBack()
        } else {
            setSaindo(true);
            setConfirmOpen(true);
        }
    }

    const visualizar = (sairSemSalvar) => {
        if (sairSemSalvar || !alteracoesPendentes) {
            refetchPlantaDetalhes();
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
        if (planta.imagem) {
            const bufferPlanta = Buffer.from(planta.imagem, 'binary');
            setImagem(bufferPlanta.toString('base64'));
            setImagemSize(sizeOf(bufferPlanta));
        }
    }, [planta, setImagem]);

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

        setMap(areas);
    }, [plantaDetalhes, detalhes]);

    useEffect(() => {
        setImagemDetalhe(null);
        if (detalhe && detalhe.id)
            getDetalhe(detalhe.id)
                .then(
                    (data) => {
                        if (data.imagem)
                            setImagemDetalhe("data:image/jpeg;base64," + Buffer.from(data.imagem, 'binary').toString('base64'));
                    },
                    (error) => {
                        alert(error.message || 'Ocorreu um erro ao recuperar os dados da planta.');
                    }
                );
    }, [detalhe, setImagemDetalhe]);

    useEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, [windowWidth, windowHeight]);

    const lightboxCustom = (modalStyle) => <Lightbox
        mainSrc={imagemDetalhe}
        onCloseRequest={() => setCadastroOpen(false)}
        reactModalStyle={modalStyle}
    />

    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Box display="flex" padding="2px">
                <Box flexGrow={1} />
                {editando ? (
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
                <Tooltip title="Salvar">
                    <IconButton disabled={!alteracoesPendentes} variant="contained" color="primary" aria-label="Salvar" onClick={salvar}>
                        <Save />
                    </IconButton>
                </Tooltip>
                <Box flexGrow={1} />

            </Box>
            <Container
                ref={targetRef}
                disableGutters={true}
                maxWidth={false}
                style={{ flex: 1, overflow: 'auto' }}
            >
                <MapInteraction
                    value={interacao}
                    onChange={(value) => setInteracao(value)}
                    minScale={minScale}
                    maxScale={maxScale}
                >
                    {
                        ({ translation, scale }) => {
                            return <div style={{ height: "100%", width: "100%", position: "relative", overflow: "hidden" }}>
                                <div style={{ display: 'inline-block', transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`, transformOrigin: `0px 0px` }}>
                                    <DetalhesPlantaMapper
                                        src={`data:image/jpeg;base64,${imagem}`}
                                        map={map}
                                        onClick={area => clicked(area)}
                                        onImageClick={coords => handleClickImagem(coords)}
                                        scale={scale}
                                    />
                                </div>
                            </div>
                        }
                    }
                </MapInteraction>
            </Container>
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
            {cadastroOpen && !editando &&
                <>
                    <Hidden lgUp>
                        {lightboxCustom({
                            content: {
                                marginTop: 64
                            }
                        })}
                    </Hidden>
                    <Hidden lgDown>
                        {lightboxCustom({
                            content: {
                                marginTop: 64,
                                marginLeft: 128,
                                paddingLeft: 128
                            }
                        })}
                    </Hidden>
                </>
            }
            <DetalhesPlantaCadastro
                idprojeto={idprojeto}
                plantaDetalhe={plantaDetalhe}
                setPlantaDetalhe={setPlantaDetalhe}
                open={cadastroOpen && editando}
                onClose={() => setCadastroOpen(false)}
                handleSubmit={handleSubmit}
                handleClickRemover={handleClickRemover}
            />
        </Box>
    );
}

export default DetalhesPlantaInteracao;