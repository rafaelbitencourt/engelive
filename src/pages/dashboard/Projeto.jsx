import { 
    Pagina, 
    CadastroProjeto, 
    ListaDetalhes, 
    ListaPlantas 
} from 'components';
import { useParams } from "react-router-dom";
import { Grid } from '@material-ui/core';

const Projeto = () => {
    const params = useParams();

    return (
        <Pagina titulo="Projeto">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CadastroProjeto {...params} />
                </Grid>
                {params.idprojeto &&
                    <Grid item xs={12}>
                        <ListaPlantas {...params} />
                    </Grid>
                }
                {params.idprojeto &&
                    <Grid item xs={12}>
                        <ListaDetalhes {...params} />
                    </Grid>
                }
            </Grid>
        </Pagina>
    );
}

export default Projeto;