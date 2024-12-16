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
            const { name, author, location, description, contactPhone } = req.body;
            const photo = req.file ? req.file.path : null;

            if (!photo) {
                return res.status(400).json({ message: 'Photo is required' });
            }

            const bookData = { name, author, location, description, contactPhone, photo };
            const book = await BookService.createBook(bookData, req.user.id);

            res.status(201).json(book);
        } catch (error) {
            res.status(400).json({ message: 'Error creating book', error: error.message });
        }
    }

    async updateBook(req, res) {
        try {
            const bookData = req.body;
            if (req.file) {
                bookData.photo = req.file.path;
            }
            const updatedBook = await BookService.updateBook(req.params.id, bookData, req.user.id);
            res.json(updatedBook);
        } catch (error) {
            res.status(400).json({ message: 'Error updating book', error });
        }
    }

    async deleteBook(req, res) {
        try {
            await BookService.deleteBook(req.params.id, req.user.id);
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            console.error('Error in deleteBook:', error);
            res.status(400).json({ message: 'Error deleting book', error });
        }
    }
}

module.exports = new BookController();
