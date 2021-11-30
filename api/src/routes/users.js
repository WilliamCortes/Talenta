const express = require('express');
const { getAllUsers, createNewUser, getUserById, addBookToUser, removeBookToUser } = require('../controllers/users.js');

const router = express.Router();


router.get('/', getAllUsers);

router.post('/', createNewUser);

router.get('/:id', getUserById);

router.post('/:userId/book/:bookId', addBookToUser);

router.put('/:userId/book/:bookId', removeBookToUser);

module.exports = router;