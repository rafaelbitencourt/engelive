import axios from "axios";
import config from '../configs/config.json';

const API_URL = config.UrlApi + "auth/";

class AuthService {
    login(usuario, senha) {
        return axios
            .post(API_URL + "signin", {
                usuario,
                senha
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(user) {
        return axios.post(API_URL + "signup", user);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();