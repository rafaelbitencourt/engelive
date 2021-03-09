import axios from 'axios';
import authHeader from '../services/auth-header';

//const urlApi = "http://localhost:3001/";
const urlApi = "https://engeliveapi.herokuapp.com/";

export const listObras = () => axios
    .get(urlApi + 'obras', { headers: authHeader() })
    .then(({ data }) => data)

export const getObra = (id) => axios
    .get(urlApi + 'obras/' + id, { headers: authHeader() })
    .then(({ data }) => data)

export const saveObra = (data) => {
    if (data.id) {
        return axios.put(urlApi + 'obras/' + data.id, data, { headers: authHeader() })
            .then(({ data }) => data)
    } else {
        return axios.post(urlApi + 'obras', data, { headers: authHeader() })
            .then(({ data }) => data)
    }
}

export const deleteObra = (id) => axios
    .delete(urlApi + 'obras/' + id, { headers: authHeader() })

export const listPlantasPorProjeto = (id) => axios
    .get(urlApi + 'projeto/' + id + '/plantas', { headers: authHeader() })
    .then(({ data }) => data)

export const getPlanta = (id) => axios
    .get(urlApi + 'plantas/' + id, { headers: authHeader() })
    .then(({ data }) => data)

export const savePlanta = (data) => {
    if (data.id) {
        delete data.imagem;
        return axios.put(urlApi + 'plantas/' + data.id, data, { headers: authHeader() })
            .then(({ data }) => data)
    } else {
        const formData = new FormData();
        formData.append('idprojeto', data.idprojeto);
        formData.append('descricao', data.descricao);
        formData.append('imagem', data.imagem);
        const headers = authHeader();
        headers["content-type"] = 'multipart/form-data';

        return axios.post(urlApi + 'plantas', formData, { headers: headers })
            .then(({ data }) => data)
    }
}

export const deletePlanta = (id) => axios
    .delete(urlApi + 'plantas/' + id, { headers: authHeader() })

export const getPlantasDetalhes = (idplanta) => axios
    .get(urlApi + 'plantas_detalhes/' + idplanta, { headers: authHeader() })
    .then(({ data }) => data)

export const savePlantasDetalhes = (idplanta, data) => {
    var params = {
        idplanta: idplanta,
        detalhes: data || []
    }
    return axios.post(urlApi + 'plantas_detalhes', params, { headers: authHeader() })
        .then(({ data }) => data)
}

export const listMateriais = () => axios
    .get(urlApi + 'materiais', { headers: authHeader() })
    .then(({ data }) => data)

export const listDetalhesPorProjeto = (id) => axios
    .get(urlApi + 'projeto/' + id + '/detalhes', { headers: authHeader() })
    .then(({ data }) => data)

export const deleteDetalhe = (id) => axios
    .delete(urlApi + 'detalhes/' + id, { headers: authHeader() })

export const saveDetalhe = (data) => {
    if (data.id) {
        delete data.imagem;
        return axios.put(urlApi + 'detalhes/' + data.id, data, { headers: authHeader() })
            .then(({ data }) => data)
    } else {
        const formData = new FormData();
        formData.append('nome', data.nome);
        formData.append('descricao', data.descricao);
        formData.append('idprojeto', data.idprojeto);        
        formData.append('imagem', data.imagem);
        const headers = authHeader();
        headers["content-type"] = 'multipart/form-data';

        return axios.post(urlApi + 'detalhes', formData, { headers: headers })
            .then(({ data }) => data)
    }
}

export const getDetalhe = (id) => axios
    .get(urlApi + 'detalhes/' + id, { headers: authHeader() })
    .then(({ data }) => data)

export const listTiposProjetos = () => axios
    .get(urlApi + 'tipos_projetos', { headers: authHeader() })
    .then(({ data }) => data)

export const deleteTipoProjeto = (id) => axios
    .delete(urlApi + 'tipos_projetos/' + id, { headers: authHeader() })

export const saveTipoProjeto = (data) => {
    if (data.id) {
        return axios.put(urlApi + 'tipos_projetos/' + data.id, data, { headers: authHeader() })
            .then(({ data }) => data)
    } else {
        return axios.post(urlApi + 'tipos_projetos', data, { headers: authHeader() })
            .then(({ data }) => data)
    }
}

export const getTipoProjeto = (id) => axios
    .get(urlApi + 'tipos_projetos/' + id, { headers: authHeader() })
    .then(({ data }) => data)

export const listProjetosPorObra = (id) => axios
    .get(urlApi + 'obra/' + id + '/projetos', { headers: authHeader() })
    .then(({ data }) => data)

export const deleteProjeto = (id) => axios
    .delete(urlApi + 'projetos/' + id, { headers: authHeader() })

export const getProjeto = (id) => axios
    .get(urlApi + 'projetos/' + id, { headers: authHeader() })
    .then(({ data }) => data)

export const saveProjeto = (data) => {
    if (data.id) {
        return axios.put(urlApi + 'projetos/' + data.id, data, { headers: authHeader() })
            .then(({ data }) => data)
    } else {
        return axios.post(urlApi + 'projetos', data, { headers: authHeader() })
            .then(({ data }) => data)
    }
}
