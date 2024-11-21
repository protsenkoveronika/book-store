const BookService = require('../services/bookService');

class BookController {
    async getAllBooks(req, res) {
        try {
            const books = await BookService.getAllBooks(req.query);
            res.json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching books', error });
        }
    }

    async createBook(req, res) {
        try {
            const book = await BookService.createBook(req.body, req.user.id);
            res.status(201).json(book);
        } catch (error) {
            res.status(400).json({ message: 'Error creating book', error });
        }
    }

    async updateBook(req, res) {
        try {
            const book = await BookService.updateBook(req.params.id, req.body, req.user.id);
            res.json(book);
        } catch (error) {
            res.status(400).json({ message: 'Error updating book', error });
        }
    }

    async deleteBook(req, res) {
        try {
            await BookService.deleteBook(req.params.id, req.user.id);
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error deleting book', error });
        }
    }
}

module.exports = new BookController();
