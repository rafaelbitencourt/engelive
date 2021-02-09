import axios from "axios";

// const API_URL = "http://localhost:3001/auth/";
const API_URL = "http://engeliveapi.herokuapp.com/auth/";

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