import http from "../http-common";

class SignUpService {
    get(id) {
        return http.get(`/user/${id}`);
    }
    
}

export default new SignUpService();