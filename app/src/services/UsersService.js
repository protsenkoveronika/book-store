import http from "../http-common";

class UsersService {
    profile() {
        const token = localStorage.getItem("token");
        return http.get("/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    login(credentials) {
        return http.post("/login", credentials);
    }

    signup(credentials) {
        return http.post("/register", credentials);
    }
}

export default new UsersService();