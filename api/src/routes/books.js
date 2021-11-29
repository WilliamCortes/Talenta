const express = require('express');
const { Book } = require('../models');

const router = express.Router();


router.get('/', (req, res, next) => {
    return Book.findAll()
        .then(books => res.json(books))
        .catch(error => next(error));
});

router.post('/', (req, res, next) => {
    const { name, image } = req.body;
    Book.create({ name, image })
        .then(createdUser => res.json(createdUser))
        .catch(error => next(error));
})

router.get('/rentedBooks', (req, res, next) => {
    return Book.findAll().
        then(books => {
            let booksRented = books.filter(book => book.UserId !== null)
            res.json(booksRented)
        })
        .catch(error => next(error));
});

router.get('/availableBooks', (req, res, next) => {
    return Book.findAll().
        then(books => {
            let booksRented = books.filter(book => book.UserId === null)
            res.json(booksRented)
        })
        .catch(error => next(error));
});

module.exports = router;