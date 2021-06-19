import { ListaCadastro } from 'components';

const ListaDetalhes = ({ idobra, idprojeto }) => <ListaCadastro
    title="Detalhes"
    getMethod={`projeto/${idprojeto}/detalhes`}
    deleteMethod="detalhes"
    linkNew={`/app/obra/${idobra}/projeto/${idprojeto}/detalhe`}
    getTextItem={(row) => row.nome}
    getLinkItem={(row) => `/app/obra/${idobra}/projeto/${idprojeto}/detalhe/${row.id}`}
    getLinkEdit={(row) => `/app/obra/${idobra}/projeto/${idprojeto}/detalhe/${row.id}`}
/>

export default ListaDetalhes;