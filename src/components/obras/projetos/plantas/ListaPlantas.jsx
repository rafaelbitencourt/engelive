import { useParams } from "react-router-dom";

import ListaCadastro from 'components/lista/ListaCadastro'

const ListaProjetos = () => {
    const { idobra, idprojeto } = useParams();

    return <ListaCadastro
        title="Plantas"
        getMethod={`projeto/${idprojeto}/plantas`}
        deleteMethod="plantas"
        linkNew={`/app/obra/${idobra}/projeto/${idprojeto}/planta`}
        getTextItem={(row) => row.descricao}
        getLinkItem={(row) => `/app/obra/${idobra}/projeto/${idprojeto}/planta/${row.id}/detalhes`}
        getLinkEdit={(row) => `/app/obra/${idobra}/projeto/${idprojeto}/planta/${row.id}`}
    />
}

export default ListaProjetos;