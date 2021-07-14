import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from '@material-ui/core';

import { SelectDetalhes, ImagemView } from 'components';

const DetalhesPlantaCadastro = ({ idprojeto, plantaDetalhe, setPlantaDetalhe, open, onClose, handleSubmit, handleClickRemover, }) => {
    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title">
            <form onSubmit={(event) => handleSubmit(event)}>
                <DialogTitle id="form-dialog-title">{(plantaDetalhe?.id) ? "Alterar detalhe" : "Inserir detalhe"}</DialogTitle>
                <DialogContent>
                    <SelectDetalhes
                        idprojeto={idprojeto}
                        // error={Boolean(errors.idtipoprojeto)}
                        // helperText={errors.idtipoprojeto}
                        value={plantaDetalhe?.iddetalhe}
                        setValue={(value) => setPlantaDetalhe({...plantaDetalhe, iddetalhe: value})}
                    />
                    <Grid item xs={12}>
                        <ImagemView
                            url={`detalhes/${plantaDetalhe?.iddetalhe}`} 
                            getImagem={(detalhe) => detalhe.imagem}
                        />
                        {/* <Image
                            aspectRatio={(16 / 9)}
                            src={imagemDetalhe || "/logo.png"}
                        /> */}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button disabled={!plantaDetalhe?.iddetalhe} onClick={handleClickRemover} variant="outlined">
                        Remover
                    </Button>
                    <Button onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained">
                        {plantaDetalhe?.id ? "Alterar" : "Inserir"}
                    </Button>
                </DialogActions>
            </form> 
        </Dialog>
    );
}

export default DetalhesPlantaCadastro;