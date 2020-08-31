import axios from 'axios';
import authHeader from '../services/auth-header';

const urlApi = "http://note-rafael:3001/";

export const listProjetos = () => axios
    .get(urlApi + 'projetos', { headers: authHeader() })
    .then(({ data }) => data)

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

export const deleteProjeto = (id) => axios
    .delete(urlApi + 'projetos/' + id, { headers: authHeader() })

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
        return axios.put(urlApi + 'materiais/' + data.id, data, { headers: authHeader() })
            .then(({ data }) => data)
    } else {
        return axios.post(urlApi + 'materiais', data, { headers: authHeader() })
            .then(({ data }) => data)
    }
}

export const getMaterial = (id) => axios
    .get(urlApi + 'materiais/' + id, { headers: authHeader() })
    .then(({ data }) => data)