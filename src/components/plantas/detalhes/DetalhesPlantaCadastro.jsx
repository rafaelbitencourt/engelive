import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
} from '@material-ui/core';
import Image from 'material-ui-image';

import { SelectDetalhes, ImagemView } from 'components';
import useAxios from 'axios-hooks';

const DetalhesPlantaCadastro = ({ idprojeto, detalhe, setDetalhe, open, onClose }) => {
    const [{ data, loading, error }] = useAxios('detalhes', { useCache: false });
    // const [detalhe, setDetalhe] = useState(null);
    // const [imagemDetalhe, setImagemDetalhe] = useState(null);
    // detalhe={detalhe}
    // setDetalhe={setDetalhe}

    // const [{ data, loading, error }, refetch] = useAxios(`${controller}/${id}`, {
    //     useCache: false,
    //     manual: true
    // });

    // useEffect(() => {
    //     debugger;
    //     if(detalhe)
    //         setImagemDetalhe("data:image/jpeg;base64," + Buffer.from(detalhe.imagem, 'binary').toString('base64'));
    // }, [detalhe]);

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title">
            {/* <form onSubmit={(event) => handleSubmit(event)}> */}
                <DialogTitle id="form-dialog-title">{(iddetalhe) ? "Alterar detalhe" : "Inserir detalhe"}</DialogTitle>
                <DialogContent>
                    <SelectDetalhes
                        idprojeto={idprojeto}
                        // error={Boolean(errors.idtipoprojeto)}
                        // helperText={errors.idtipoprojeto}
                        value={detalhe?.id}
                        setValue={(value) => setDetalhe({...detalhe, idvalue})}
                    />
                    <Grid item xs={12}>
                        <ImagemView
                            url={`detalhes/${iddetalhe}`} 
                            getImagem={(detalhe) => detalhe.imagem}
                        />
                        {/* <Image
                            aspectRatio={(16 / 9)}
                            src={imagemDetalhe || "/logo.png"}
                        /> */}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button disabled={!iddetalhe} /*onClick={handleClickRemover}*/ variant="outlined">
                        Remover
                    </Button>
                    <Button onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained">
                        {iddetalhe ? "Alterar" : "Inserir"}
                    </Button>
                </DialogActions>
            {/* </form>  */}
        </Dialog>
    );
}

export default DetalhesPlantaCadastro;