import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import {
    Hidden,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        // color: '#fff',
    },
}));

const DetalhesPlantaView = ({ iddetalhe, onClose }) => {
    const classes = useStyles();
    const [{ data }] = useAxios(`detalhes/${iddetalhe}`);
    const [imagemDetalhe, setImagemDetalhe] = useState(null);

    useEffect(() => {
        if (data && data.imagem)
            setImagemDetalhe("data:image/jpeg;base64," + Buffer.from(data.imagem, 'binary').toString('base64'));
    }, [data, setImagemDetalhe]);

    if (!imagemDetalhe)
        return <Backdrop
            className={classes.backdrop}
            open
            invisible
        >
            <CircularProgress />
        </Backdrop>;

    return <>
        <Hidden lgUp>
            <Lightbox
                mainSrc={imagemDetalhe}
                onCloseRequest={onClose}
                reactModalStyle={{
                    content: {
                        marginTop: 64
                    }
                }}
            />
        </Hidden>
        <Hidden lgDown>
            <Lightbox
                mainSrc={imagemDetalhe}
                onCloseRequest={onClose}
                reactModalStyle={{
                    content: {
                        marginTop: 64,
                        marginLeft: 128,
                        paddingLeft: 128
                    }
                }}
            />
        </Hidden>
    </>;
}

export default DetalhesPlantaView;