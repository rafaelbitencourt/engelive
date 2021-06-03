class AuthService {
    login(data) {
        localStorage.setItem("user", JSON.stringify(data));
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    getToken() {
        return this.getCurrentUser()?.accessToken;
    }
}

export default new AuthService();
