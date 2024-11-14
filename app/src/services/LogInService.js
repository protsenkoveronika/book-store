import http from "../http-common";

class LogInService {
    get(id) {
        return http.get(`/user/${id}`);
    }

    login(credentials) {
        return http.post("/login", credentials);
    }
}

export default new LogInService();