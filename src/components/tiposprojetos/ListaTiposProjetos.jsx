import ListaCadastro from 'components/lista/ListaCadastro'

const ListaTiposProjetos = () =>
    <ListaCadastro
        controller="tipos_projetos"
        linkNew="/app/tipoprojeto"
        getTextItem={(row) => row.nome}
        getLinkItem={(row) => `/app/tipoprojeto/${row.id}`}
        getLinkEdit={(row) => `/app/tipoprojeto/${row.id}`}
    />

export default ListaTiposProjetos;