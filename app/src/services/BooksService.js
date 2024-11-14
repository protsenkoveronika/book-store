import http from "../http-common";

class BooksService {
    getAll() {
        return http.get("/allBooks");
    }

    get(id) {
        return http.get(`/book/${id}`);
    }

    create(offer) {
        return http.post("/createBook", book);
    }

    update(id, offer) {
        return http.put(`/updateBook/${id}`, book);
    }

    delete(id) {
        return http.delete(`/deleteBook/${id}`);
    }
}

export default new BooksService();