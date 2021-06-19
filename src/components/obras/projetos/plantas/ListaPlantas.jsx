import { ListaCadastro } from 'components';

const ListaPlantas = ({ idobra, idprojeto }) => <ListaCadastro
    title="Plantas"
    getMethod={`projeto/${idprojeto}/plantas`}
    deleteMethod="plantas"
    linkNew={`/app/obra/${idobra}/projeto/${idprojeto}/planta`}
    getTextItem={(row) => row.descricao}
    getLinkItem={(row) => `/app/obra/${idobra}/projeto/${idprojeto}/planta/${row.id}/detalhes`}
    getLinkEdit={(row) => `/app/obra/${idobra}/projeto/${idprojeto}/planta/${row.id}`}
/>

export default ListaPlantas;