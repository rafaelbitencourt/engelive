import React from 'react';
import {
    Fab,
    Box,
    Tooltip
} from '@material-ui/core';
import { ImageSearch } from '@material-ui/icons';

const DetalhesPlantaMapperBotao = ({ scaledCoords, onClick, label }) => {
    return <Tooltip
        title={label}
        placement="top"
    >
        <Box
            position="absolute"
            top={scaledCoords[1] - 25}
            left={scaledCoords[0] - 25}
            zIndex="tooltip"
        >
            <Fab
                color="primary"
                onClick={onClick}
                onTouchEnd={onClick}
            >
                <ImageSearch fontSize="large" />
            </Fab>
        </Box>
    </Tooltip>;
}

export default DetalhesPlantaMapperBotao;