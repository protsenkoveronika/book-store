import http from "../http-common";

class OrdersService {
    getBookReservation(bookId) {
        const token = localStorage.getItem("token");
        return http.get(`/reservation/${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    createOrder(_id, reservationData) {
        const token = localStorage.getItem("token");
        return http.post(`/reserve/${_id}`, reservationData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new OrdersService();