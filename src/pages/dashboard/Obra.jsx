import { Pagina, CadastroObra, ListaProjetos } from 'components';
import { useParams } from "react-router-dom";
import { Grid } from '@material-ui/core';

const Obra = () => {
    const params = useParams();

    return (
        <Pagina titulo="Obra">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CadastroObra {...params} />
                </Grid>
                {params.idobra &&
                    <Grid item xs={12}>
                        <ListaProjetos {...params} />
                    </Grid>
                }
            </Grid>
        </Pagina>
    );
}

export default Obra;