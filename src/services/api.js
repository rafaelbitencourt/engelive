import axios from 'axios';
import { configure } from 'axios-hooks';
import config from 'configs/config.json';

axios.defaults.baseURL = config.UrlApi;
axios.defaults.timeout = 30000;

//Falta Tratar logout e refresh token  
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
            case 401:
                return Promise.reject(error.response.data?.message || 'Ocorreu um erro');
            // case 401:
            //     authService.logout();
            //     return Promise.reject('Usuário não autenticado');
            default:
                return Promise.reject(`Ocorreu um erro: ${error.response.data?.message}`);
        }
    });

configure({ axios })