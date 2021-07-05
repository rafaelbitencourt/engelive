import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import Image from 'material-ui-image';

import useAxios from 'axios-hooks';

const ImagemView = ({ url, getImagem, propsImage }) => {
    const [{ data, loading }] = useAxios(url);
    const [imagem, setImagem] = useState(null);
    
    useEffect(() => {
        if (data)
            setImagem("data:image/jpeg;base64," + Buffer.from(getImagem(data), 'binary').toString('base64'));
    }, [data]);

    if (loading) return <CircularProgress />;

    return (
        <Image
            aspectRatio={(16 / 9)}
            src={imagem || "/logo.png"}
            {...propsImage}
        />
    );
}

export default ImagemView;