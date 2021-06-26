import React, { useRef, useEffect, useState, useCallback, useReducer } from 'react';
import {
    Popper,
    Fab,
    Fade
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

const DetalhesPlantaMapperBotao = ({ refImg, scaledCoords }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (refImg) {
            debugger;
            const getBoundingClientRect = () => refImg.getBoundingClientRect();

            setOpen(true);
            setAnchorEl({
                clientWidth: scaledCoords[1],
                clientHeight: scaledCoords[0],
                getBoundingClientRect
            });
            // } else {
            //     setOpen(false);
            //     setAnchorEl({
            //         clientWidth: getBoundingClientRect().width,
            //         clientHeight: getBoundingClientRect().height,
            //         getBoundingClientRect,
            //     });
        }
    }, [refImg, scaledCoords]);

    return (
        <Popper /*id={id}*/ open={open} anchorEl={anchorEl} /*transition placement="bottom-start"*/>
            {({ TransitionProps }) => (
                // <Fade {...TransitionProps} timeout={350}>
                    <Fab onClick={() => console.log("DALE")} onTouchEnd={() => console.log("TESTE")}>
                        <Add />
                    </Fab>
                // </Fade>
            )}
        </Popper>
    );
}

export default DetalhesPlantaMapperBotao;