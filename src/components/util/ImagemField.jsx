import React, { useEffect, useState } from 'react';

import ImageUploader from 'react-images-upload';
import Image from 'material-ui-image';

const ImagemField = ({ value, setValue }) => {

    const [imagemBase64, setImagemBase64] = useState(null);

    useEffect(() => {
        if (value) {
            if (value instanceof File)
                value.arrayBuffer().then(buffer => setImagemBase64(Buffer.from(buffer).toString('base64')));
            else if (value.type === "Buffer")
                setValue(new File([Buffer.from(value, 'binary').buffer], "imagem.png", { type: "image/png" }));
        }
    }, [value, setValue]);

    return (
        <>
            <ImageUploader
                withIcon={false}
                label="Máximo: 200Mb - Extensões: jpg | jpeg | png"
                buttonText='Selecionar imagem'
                name="imagem"
                onChange={(imagens) => {
                    setValue(imagens[0]);
                }}
                imgExtension={['.jpg', '.jpeg', '.png']}
                fileTypeError="não é uma extensão de arquivo suportada"
                maxFileSize={200000000}
                fileSizeError="excede o tamanho limite"
                withPreview={false}
                singleImage
            />
            {imagemBase64 &&
                <Image
                    aspectRatio={(16 / 9)}
                    src={`data:image/png;base64,${imagemBase64}`}
                />
            }
        </>
    );
}

export default ImagemField;