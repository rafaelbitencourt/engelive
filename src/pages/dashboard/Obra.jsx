import { CadastroObra } from 'components/obras';
import { ListaProjetos } from 'components/projetos';
import { useParams } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { Pagina } from 'components';

const Obra = () => {
    const { idobra } = useParams();

    return (
        <Pagina titulo="Obra">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CadastroObra idobra={idobra} />
                </Grid>
                {idobra &&
                    <Grid item xs={12}>
                        <ListaProjetos idobra={idobra} />
                    </Grid>
                }
            </Grid>
        </Pagina>
    );
}

export default Obra;