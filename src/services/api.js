import axios from 'axios';
import { configure } from 'axios-hooks';

axios.defaults.baseURL = process.env.REACT_APP_URL_API;
axios.defaults.timeout = 30000;
configure({ axios });

const setTokenApi = (token) => {
    axios.defaults.headers["x-access-token"] = token;
}

const setInterceptorResponseApi = (resetUser) => {
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.__CANCEL__)
                return error;

            if (error.code === "ECONNABORTED")
                return Promise.reject("Não foi possível se conectar ao servidor, verifique sua conexão com a internet.");

            if (error.response?.status === 401) 
                return resetUser();

            if (error.response?.status >= 500)
                return Promise.reject(`Ocorreu um erro no servidor: ${error.response.data?.message}`);

            if (error.response?.status >= 400)
                return Promise.reject(error.response.data?.message || 'Ocorreu um erro');

            return Promise.reject(error);
        });
};

export {
    setTokenApi,
    setInterceptorResponseApi
};