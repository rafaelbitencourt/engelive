import axios from "axios";
import config from '../configs/config.json';

const API_URL = config.UrlApi + "auth/";

class AuthService {
    login(data) {
        localStorage.setItem("user", JSON.stringify(data));
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

    getToken() {
        return this.getCurrentUser()?.accessToken;
    }
}

export default new AuthService();
