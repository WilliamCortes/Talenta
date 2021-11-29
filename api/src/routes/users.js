const express = require('express');
const { User, Book } = require('../models');

const router = express.Router();


router.get('/', (req, res, next) => {
    return User.findAll({
        include: Book,
    }).then(users => res.json(users))
        .catch(error => next(error));
});

router.post('/', (req, res, next) => {
    const { name } = req.body;
    User.create({ name })
        .then(createdUser => res.json(createdUser))
        .catch(error => next(error));
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    return User.findByPk(id, { include: Book, })
        .then(user => res.json(user))
        .catch(error => next(error));
});

router.post('/:userId/book/:bookId', async (req, res, next) => {
    try {
        const { userId, bookId } = req.params;
        let book = await Book.findByPk(bookId);
        if (book.UserId) {
            let userId = book.UserId
            let currentUser = await User.findByPk(userId);
            return res.send(`Este libro está prestado a: ${currentUser.name}`)
        }
        let user = await User.findByPk(userId, {});
        let result = await user.addBook(book);
        res.json(`Prestamo exitoso a: ${result.name}`);
    } catch (error) {
        next(error)
    }
})

router.put('/:userId/book/:bookId', async (req, res, next) => {
    try {
        const { userId, bookId } = req.params;
        let book = await Book.findByPk(bookId);
        let user = await User.findByPk(userId, {
            include: Book,
        });
        let Books = user.Books.filter(book => book.id != bookId);
        let resultBook = await book.update({ ...book, UserId: null }, {})
        let resultUser = await user.update({ ...user, Books: Books }, {});
        res.json(resultUser)


    } catch (error) {
        next(error)
    }
})

module.exports = router;