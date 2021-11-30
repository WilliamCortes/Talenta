const { Book } = require('../models');

const getAllBooks = (req, res, next) => {
    return Book.findAll()
        .then(books => res.json(books))
        .catch(error => next(error));
};

const addNewBook = (req, res, next) => {
    const { name, image } = req.body;
    Book.create({ name, image })
        .then(createdUser => res.json(createdUser))
        .catch(error => next(error));
};

const allRentedBooks = (req, res, next) => {
    return Book.findAll().
        then(books => {
            let booksRented = books.filter(book => book.UserId !== null)
            res.json(booksRented)
        })
        .catch(error => next(error));
};
const allAvailableBooks = (req, res, next) => {
    return Book.findAll().
        then(books => {
            let booksRented = books.filter(book => book.UserId === null)
            res.json(booksRented)
        })
        .catch(error => next(error));
};

module.exports = {
    getAllBooks,
    addNewBook,
    allRentedBooks,
    allAvailableBooks,
}
