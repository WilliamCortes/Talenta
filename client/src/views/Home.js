import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Navbar } from '../components/Navbar.js';

export const Home = () => {

    const initialState = { user: '', book: '' }
    const [allUsers, setAllUsers] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [booksRented, setBooksRented] = useState([]);
    const [booksAvailable, setBooksAvailable] = useState([]);
    const [input, setInput] = useState(initialState);
    const [userIdState, setuserIdState] = useState({ id: '' });
    const [show, setShow] = useState({ nane: '', data: [] });

    const chargeData = async () => {
        // const users = await axios.get(`/api/users/`);
        // setAllUsers(users.data);
        // const books = await axios.get(`/api/books/`);
        // setAllBooks(books.data);
        const booksAvailable = await axios.get(`/api/books/availableBooks/`);
        setBooksAvailable(booksAvailable.data);
    }
    // chargeData();
    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value, });
    }
    const handleChandeUserId = (event) => {
        let id = parseInt(event.target.value.split(':')[1].trim());
        setuserIdState({ id })
    }
    const getUserId = async () => {
        if (userIdState) {
            const response = await axios.get(`/api/users/${userIdState.id}/`);
            setShow({ nane: response.data.name, Books: [...response.data.Books] })
            swal({
                title: '¡Genial!',
                text: `Reporte de ${response.data.name}`,
                icon: "success",
                timer: 1200,
            });
        } else {
            swal({
                title: "¡Lo siento!",
                text: `Debes selecionar un usuario`,
                icon: "warning",
            });

        }

    }
    const getAllUsers = async () => {
        const users = await axios.get(`/api/users/`);
        setAllUsers(users.data);
    }

    const getAllBooks = async () => {
        const books = await axios.get(`/api/books/`);
        setAllBooks(books.data);
    }

    const getRentedBooks = async () => {
        const booksRented = await axios.get(`/api/books/rentedBooks/`);
        setBooksRented(booksRented.data);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (input.user && input.book) {
            const userId = parseInt(input.user.split(':')[1]);
            const bookId = parseInt(input.book.split(':')[1]);
            const response = await axios.post(`/api/users/${userId}/book/${bookId}/`);
            setInput(initialState);
            swal({
                title: "¡Listo!",
                text: `${response.data}`,
                icon: "success",
            });
        } else {
            swal({
                title: "¡Lo siento!",
                text: `Debes selecionar un usuario y un libro`,
                icon: "warning",
            });
        }
    }
    console.log('home :', show)
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <section>

                <button onClick={() => getAllUsers()}>Lista Usuraios</button>
                <button onClick={() => getAllBooks()}>Lista Libros</button>
                <button onClick={() => getAllUsers()}>Alquilar Libros</button>
                <button onClick={() => getRentedBooks()}>Reporte de Libros Alquilados</button>
                <div>
                    <label>
                        Usuarios Registrados
                        <input list="userId" autoComplete='off' name="userId" onChange={handleChandeUserId} />
                    </label>
                    <datalist id="userId">
                        {
                            allUsers?.map((user, key) => (
                                <option key={`home-data-u${key}`} value={`${user.name} | id: ${user.id}`} />
                            ))
                        }
                    </datalist>
                    <button onClick={() => getUserId()}>Ver Libros Alquilados por un usuario</button>
                </div>
            </section>
            <main>
                <br />
                <h2>Total de libros de la biblioteca</h2>
                {
                    allBooks?.length ?
                        allBooks.map((book, key) => (
                            <p key={`home-book${key}`}>{book.name}</p>
                        ))
                        : null
                }
                <br />
                <h2>Total de usuarios disponibles</h2>
                {
                    allUsers?.length ?
                        allUsers.map((user, key) => (
                            <p key={`home-user${key}`}>{user.name}</p>
                        ))
                        : null
                }
                <br />
                <h2>Libros Alquilados</h2>
                {
                    booksRented?.length ?
                        booksRented.map((book, key) => (
                            <p key={`home-book${key}`}>{book.name}</p>
                        ))
                        : null
                }
            </main>
            <br />
            <section>
                <h2>Alquilar un libro</h2>
                <p>Por favor seleciona un usuario y el libro</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Usuarios Registrados
                        <input list="users" autoComplete='off' name="user" onChange={handleChange} />
                    </label>
                    <datalist id="users">
                        {
                            allUsers?.map((user, key) => (
                                <option key={`home-data-u${key}`} value={`${user.name} | id: ${user.id}`} />
                            ))
                        }
                    </datalist>
                    <label>
                        Libros Disponibles
                        <input list="books" autoComplete='off' name="book" onChange={handleChange} />
                    </label>
                    <datalist id="books">
                        {
                            booksAvailable?.map((book, key) => (
                                <option key={`home-data-ba${key}`} value={`${book.name} | id: ${book.id}`} />
                            ))
                        }
                    </datalist>
                    <button type='submit'>Alquilar Libro</button>
                </form>
                <br />
            </section>

        </div>
    )
}
