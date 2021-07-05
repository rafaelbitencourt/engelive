import React, { useRef, useEffect, useState } from 'react';
import {
    Fab,
    Box,
    Tooltip
} from '@material-ui/core';
import { ImageSearch } from '@material-ui/icons';

const DetalhesPlantaMapperBotao = ({ scaledCoords, onClick, label, scale }) => {
    const refBox = useRef();
    const [top, setTop] = useState(null);
    const [left, setLeft] = useState(null);

    useEffect(() => {
        setTop(scaledCoords[1] - refBox.current.offsetHeight / 2);
        setLeft(scaledCoords[0] - refBox.current.offsetWidth / 2);
    }, [scaledCoords]);

    return <Box
        position="absolute"
        top={top}
        left={left}
        zIndex="tooltip"
        ref={refBox}
        style={{ transform: `scale(${1 / scale})` }}
    >
        <Tooltip
            title={label}
            placement="top"
        >
            <Fab
                color="primary"
                onClick={onClick}
                onTouchEnd={onClick}
                size="small"
            >
                <ImageSearch />
            </Fab>
        </Tooltip>
    </Box>;
}

export default DetalhesPlantaMapperBotao;