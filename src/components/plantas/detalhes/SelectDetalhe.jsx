import React, { useRef, useEffect, useState, useCallback, useReducer } from 'react';
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

import Autocomplete from '@material-ui/lab/Autocomplete';
import useAxios from 'axios-hooks';

const SelectDetalhe = ({ idprojeto, iddetalhe, setIddetalhe,open, setOpen }) => {
    const [{ data, loading, error }] = useAxios('projeto/' + idprojeto + '/detalhes', { useCache: false });
    const [detalhe, setDetalhe] = useState({});

    const [{ data, loading, error }, refetch] = useAxios(`${controller}/${id}`, {
        useCache: false,
        manual: true
    });

    useEffect(() => {
        setInteracao({ acao: 'ajustar' });
    }, [iddetalhe]);

    return (
        <Dialog
            fullWidth
            open={open}//open={cadastroOpen && editando}
            onClose={() => setOpen(false)}
            aria-labelledby="form-dialog-title">
            <form onSubmit={(event) => handleSubmit(event)}>
                <DialogTitle id="form-dialog-title">{(iddetalhe) ? "Alterar detalhe" : "Inserir detalhe"}</DialogTitle>
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
                            aspectRatio={(16 / 9)}
                            src={imagemDetalhe || "/logo.png"}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button disabled={!iddetalhe} onClick={handleClickRemover} variant="outlined">
                        Remover
                        </Button>
                    <Button onClick={() => setCadastroOpen(false)}>
                        Cancelar
                        </Button>
                    <Button type="submit" variant="contained">
                        {iddetalhe ? "Alterar" : "Inserir"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default SelectDetalhe;