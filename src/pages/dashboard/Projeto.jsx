import { CadastroObra } from 'components/obras';
import { CadastroProjeto } from 'components/projetos';
import { ListaDetalhes } from 'components/detalhes';
import { ListaPlantas } from 'components/plantas';
import { useParams } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { Pagina } from 'components';

const Projeto = () => {
    const params = useParams();

    return (
        <Pagina titulo="Projeto">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CadastroObra {...params} />
                </Grid>
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