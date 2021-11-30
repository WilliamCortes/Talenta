const { User, Book } = require('../models');


const getAllUsers = (req, res, next) => {
    return User.findAll({
        include: Book,
    }).then(users => res.json(users))
        .catch(error => next(error));
};

const createNewUser = (req, res, next) => {
    const { name } = req.body;
    User.create({ name })
        .then(createdUser => res.json(createdUser))
        .catch(error => next(error));
};

const getUserById = (req, res, next) => {
    const { id } = req.params;
    return User.findByPk(id, { include: Book, })
        .then(user => res.json(user))
        .catch(error => next(error));
};

const addBookToUser = async (req, res, next) => {
    try {
        const { userId, bookId } = req.params;
        let book = await Book.findByPk(bookId);
        if (book.UserId) {
            let userId = book.UserId;
            let currentUser = await User.findByPk(userId);
            return res.send(`Este libro está prestado a: ${currentUser.name}`);
        }
        let user = await User.findByPk(userId, {});
        let result = await user.addBook(book);
        res.send(`Prestamo exitoso a: ${result.name}`);
    } catch (error) {
        next(error);
    }
};

const removeBookToUser = async (req, res, next) => {
    try {
        const { userId, bookId } = req.params;
        let book = await Book.findByPk(bookId);
        let user = await User.findByPk(userId, {
            include: Book,
        });
        let validateBook = user.Books.filter(book => book.id == bookId);
        if (!validateBook.length) {
            res.send('Lo siento no coinciden los datos');
        } else {
            let Books = user.Books.filter(book => book.id != bookId);
            let resultBook = await book.update({ ...book, UserId: null }, {});
            let resultUser = await user.update({ ...user, Books: Books }, {});
            res.send(`Devolución exitosa del libro: ${resultBook.name} Por: ${resultUser.name} `);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    addBookToUser,
    removeBookToUser,
}