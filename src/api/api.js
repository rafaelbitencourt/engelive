import axios from 'axios';
import authHeader from '../services/auth-header';

const urlApi = "http://localhost:3001/";
// const urlApi = "https://engeliveapi.herokuapp.com/";

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

export const getPlantasMateriais = (idplanta) => axios
    .get(urlApi + 'plantas_materiais/' + idplanta, { headers: authHeader() })
    .then(({ data }) => data)

export const savePlantasMateriais = (idplanta, data) => {
    var params = {
        idplanta: idplanta,
        materiais: data || []
    }
    return axios.post(urlApi + 'plantas_materiais', params, { headers: authHeader() })
        .then(({ data }) => data)
}

export const listMateriais = () => axios
    .get(urlApi + 'materiais', { headers: authHeader() })
    .then(({ data }) => data)

export const deleteMaterial = (id) => axios
    .delete(urlApi + 'materiais/' + id, { headers: authHeader() })

export const saveMaterial = (data) => {
    if (data.id) {
        delete data.imagem;
        return axios.put(urlApi + 'materiais/' + data.id, data, { headers: authHeader() })
            .then(({ data }) => data)
    } else {
        const formData = new FormData();
        formData.append('nome', data.nome);
        formData.append('descricao', data.descricao);
        formData.append('idtipo', data.idtipo);        
        formData.append('imagem', data.imagem);
        const headers = authHeader();
        headers["content-type"] = 'multipart/form-data';

        return axios.post(urlApi + 'materiais', formData, { headers: headers })
            .then(({ data }) => data)
    }
}

export const getMaterial = (id) => axios
    .get(urlApi + 'materiais/' + id, { headers: authHeader() })
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