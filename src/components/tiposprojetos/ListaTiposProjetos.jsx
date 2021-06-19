import { ListaCadastro } from 'components';

const ListaTiposProjetos = () =>
    <ListaCadastro
        title="Tipos de projeto"
        getMethod="tipos_projetos"
        deleteMethod="tipos_projetos"
        linkNew="/app/tipoprojeto"
        getTextItem={(row) => row.nome}
        getLinkItem={(row) => `/app/tipoprojeto/${row.id}`}
        getLinkEdit={(row) => `/app/tipoprojeto/${row.id}`}
    />

export default ListaTiposProjetos;