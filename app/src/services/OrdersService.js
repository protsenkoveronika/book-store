import http from "../http-common";

class OrdersService {
    getAll() {
        return http.get("/allOrders");
    }

    get(id) {
        return http.get(`/order/${id}`);
    }

    create(order) {
        return http.post("/createOrder", order);
    }
}

export default new OrdersService();