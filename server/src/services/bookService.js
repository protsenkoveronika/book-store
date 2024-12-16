const path = require('path')
const fs = require('fs')
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');

class BookService {
    async getAllBooks(query) {
        const { name, author } = query;
        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' };
        if (author) filter.author = { $regex: author, $options: 'i' };
        const books = await Book.find(filter).populate('owner', 'username');
        return books.map(book => ({
            ...book._doc,
            photo: book.photo ? `http://localhost:8000/${book.photo}` : null
        }));
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
        if (bookData.photo) book.photo = bookData.photo;
        return Book.findByIdAndUpdate(bookId, bookData, { new: true });
    }

    async deleteBook(bookId, userId) {
        console.log('Attempting to delete book with ID:', bookId); // Лог для перевірки ID
        const book = await Book.findById(bookId);
        if (!book) throw new Error('Book not found');
        if (book.owner.toString() !== userId) throw new Error('Unauthorized');

        if (book.photo) {
            const photoPath = path.join(__dirname, '..', '..', book.photo); // Тепер path підключено
            fs.unlink(photoPath, (err) => {
                if (err) console.error('Error deleting photo:', err);
            });
        }
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
