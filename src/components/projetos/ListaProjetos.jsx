import { ListaCadastro } from 'components';

const ListaProjetos = ({ idobra }) => {
    return <ListaCadastro
        title="Projetos"
        getMethod={`obra/${idobra}/projetos`}
        deleteMethod="projetos"
        linkNew={`/app/obra/${idobra}/projeto`}
        getTextItem={(row) => row.tipos_projeto.nome}
        getLinkItem={(row) => `/app/obra/${idobra}/projeto/${row.id}`}
        getLinkEdit={(row) => `/app/obra/${idobra}/projeto/${row.id}`}
    />
}

export default ListaProjetos;