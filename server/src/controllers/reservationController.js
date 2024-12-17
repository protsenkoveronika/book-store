const BookService = require('../services/bookService');

class ReservationController {
    async reserveBook(req, res) {
        try {
            const { bookId } = req.params;
            const { firstName, lastName, address, phoneNumber } = req.body;

            if (!firstName || !lastName || !address || !phoneNumber) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const reservation = await BookService.reserveBook(
                bookId,
                { firstName, lastName, address, phoneNumber },
                req.user.id
            );

            res.status(201).json({
                message: 'Book reserved successfully',
                reservation
            });
        } catch (error) {
            console.error(error.message);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ReservationController();
