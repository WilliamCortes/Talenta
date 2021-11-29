const express = require('express');
const usersRoutes = require('./users');
const booksRoutes = require('./books');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/books', booksRoutes);


module.exports = router;
