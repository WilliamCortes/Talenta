const express = require('express');
const { getAllBooks, addNewBook, allRentedBooks, allAvailableBooks } = require('../controllers/books.js');

const router = express.Router();


router.get('/', getAllBooks);

router.post('/', addNewBook);

router.get('/rentedBooks', allRentedBooks);

router.get('/availableBooks', allAvailableBooks);

module.exports = router;