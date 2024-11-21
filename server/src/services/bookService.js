const Book = require('../models/Book');
const Reservation = require('../models/Reservation');

class BookService {
    async getAllBooks(query) {
        const { name, author } = query;
        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' };
        if (author) filter.author = { $regex: author, $options: 'i' };

        return Book.find(filter).populate('owner', 'username');
    }

    async getBookById(bookId) {
        return Book.findById(bookId).populate('owner', 'username');
    }

    async createBook(bookData, ownerId) {
        return await Book.create({ ...bookData, owner: ownerId });
    }

    async updateBook(bookId, bookData, userId) {
        const book = await Book.findById(bookId);
        if (!book) throw new Error('Book not found');
        if (book.owner.toString() !== userId) throw new Error('Unauthorized');

        return Book.findByIdAndUpdate(bookId, bookData, {new: true});
    }

    async deleteBook(bookId, userId) {
        const book = await Book.findById(bookId);
        if (!book) throw new Error('Book not found');
        if (book.owner.toString() !== userId) throw new Error('Unauthorized');

        await Reservation.deleteMany({ book: bookId });
        return Book.findByIdAndDelete(bookId);
    }

    async reserveBook(bookId, reservationData, userId) {
        const book = await Book.findById(bookId);
        if (!book || book.status !== 'available') throw new Error('Book is not available');

        book.status = 'reserved';
        await book.save();

        return await Reservation.create({ ...reservationData, book: bookId, reservedBy: userId });
    }
}

module.exports = new BookService();
