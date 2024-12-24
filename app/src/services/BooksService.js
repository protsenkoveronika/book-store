import http from "../http-common";

class BooksService {
    getAll() {
        return http.get("/");
    }

    getUserReservations() {
        const token = localStorage.getItem("token");
        return http.get("/reservations", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    getUserBooks() {
        const token = localStorage.getItem("token");
        return http.get("/my-books", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    get(_id) {
        return http.get(`/${_id}`);
    }

    create(formData) {
        const token = localStorage.getItem("token");
        return http.post("/new", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        });
    }

    update(_id, formData) {
        const token = localStorage.getItem("token");
        return http.put(`/upload/${_id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        });
    }

    delete(_id) {
        const token = localStorage.getItem("token");
        return http.delete(`/delete/${_id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        });
    }
}

export default new BooksService();