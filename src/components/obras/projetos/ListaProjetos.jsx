import { useParams } from "react-router-dom";

import ListaCadastro from 'components/lista/ListaCadastro'

const ListaProjetos = () => {
    const { idobra } = useParams();

    return <ListaCadastro
        controller={`obra/${idobra}/projetos`}
        linkNew={`/app/obra/${idobra}/projeto`}
        getTextItem={(row) => row.tipos_projeto.nome}
        getLinkItem={(row) => `/app/obra/${idobra}/projeto/${row.id}/plantas`}
        getLinkEdit={(row) => `/app/obra/${idobra}/projeto/${row.id}`}
    />
}

export default ListaProjetos;