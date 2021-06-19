import { CadastroObra } from 'components/obras';
import { CadastroProjeto } from 'components/projetos';
import { ListaDetalhes } from 'components/detalhes';
import { ListaPlantas } from 'components/plantas';
import { useParams } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { Pagina } from 'components';

const Plantas = () => {
    const { idobra, idprojeto } = useParams();

    return (
        <Pagina titulo="Projeto">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CadastroObra idobra={idobra} />
                </Grid>
                <Grid item xs={12}>
                    <CadastroProjeto idobra={idobra} idprojeto={idprojeto} />
                </Grid>
                {idprojeto &&
                    <Grid item xs={12}>
                        <ListaPlantas idobra={idobra} idprojeto={idprojeto} />
                    </Grid>
                }
                {idprojeto &&
                    <Grid item xs={12}>
                        <ListaDetalhes idobra={idobra} idprojeto={idprojeto} />
                    </Grid>
                }
            </Grid>
        </Pagina>
    );
}

export default Plantas;