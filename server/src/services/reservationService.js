const path = require('path')
const fs = require('fs')
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');

class ReservationService {
    async getReservationByBookId(bookId) {
        return Reservation.findOne({ book: bookId })
            .populate({
                path: 'book',
                select: 'name author location description photo status',
                populate: { path: 'owner', select: 'username contactPhone' },
            })
            .lean();
    }
}

module.exports = new ReservationService();