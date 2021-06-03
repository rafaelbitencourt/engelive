import axios from 'axios';
import { configure } from 'axios-hooks';
import config from 'configs/config.json';

axios.defaults.baseURL = config.UrlApi;
axios.defaults.timeout = 30000;
configure({ axios });

const setTokenApi = (token) => {
    axios.defaults.headers["x-access-token"] = token;
}

const setInterceptorExpiresApi = (resetUser) => {
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.__CANCEL__)
                return error;

            if (error.code === "ECONNABORTED")
                return Promise.reject("Não foi possível se conectar ao servidor, verifique sua conexão com a internet.");

            switch (error.response?.status) {
                case 400:
                case 404:
                    return Promise.reject(error.response.data?.message || 'Ocorreu um erro');
                case 401:
                    resetUser();
                    return Promise.reject("Usuário não autenticado");
                // case 401:
                //     authService.logout();
                //     return Promise.reject('Usuário não autenticado');
                default:
                    return Promise.reject(`Ocorreu um erro: ${error.response.data?.message}`);
            }
        });
};

export {
    setTokenApi,
    setInterceptorExpiresApi
};