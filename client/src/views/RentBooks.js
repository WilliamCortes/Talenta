import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Navbar } from '../components/Navbar.js';

export const RentBooks = () => {

    const initialState = { user: '', book: '' };

    const [input, setInput] = useState(initialState);
    const [inputReturn, setInputReturn] = useState(initialState);
    const [booksAvailable, setBooksAvailable] = useState([]);
    const [booksRented, setBooksRented] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const chargeData = async () => {
            const booksAvailable = await axios.get(`/api/books/availableBooks/`);
            setBooksAvailable(booksAvailable.data);
            const booksRented = await axios.get(`/api/books/rentedBooks/`);
            setBooksRented(booksRented.data);
            const users = await axios.get(`/api/users/`);
            setAllUsers(users.data);
        };
        chargeData();
    }, []);

    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value, });
    };

    const handleChangeReturn = (event) => {
        setInputReturn({ ...inputReturn, [event.target.name]: event.target.value, });
    };

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
    };

    const handleSubmitReturn = async (event) => {
        event.preventDefault();
        if (inputReturn.user && inputReturn.book) {
            const userId = parseInt(inputReturn.user.split(':')[1]);
            const bookId = parseInt(inputReturn.book.split(':')[1]);
            const response = await axios.put(`/api/users/${userId}/book/${bookId}/`);
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
    };

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <div>
                <section className='create_for'>
                    <h2>Alquilar un libro</h2>
                    <p>Por favor seleciona un usuario y el libro</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Usuarios Registrados
                            <input
                                list="users"
                                autoComplete='off'
                                name="user"
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <datalist id="users">
                            {
                                allUsers?.map((user, key) => (
                                    <option
                                        key={`home-data-u${key}`}
                                        value={`${user.name} | id: ${user.id}`}
                                    />
                                ))
                            }
                        </datalist>
                        <label>
                            Libros Disponibles
                            <input
                                list="books"
                                autoComplete='off'
                                name="book"
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <datalist id="books">
                            {
                                booksAvailable?.map((book, key) => (
                                    <option
                                        key={`home-data-ba${key}`}
                                        value={`${book.name} | id: ${book.id}`}
                                    />
                                ))
                            }
                        </datalist>
                        <button type='submit'>Alquilar Libro</button>
                    </form>
                    <br />
                </section>

                <section className='create_for'>
                    <h2>Devolver un libro</h2>
                    <p>Por favor seleciona un usuario y el libro</p>
                    <form onSubmit={handleSubmitReturn}>
                        <label>
                            Usuarios Registrados
                            <input
                                list="users"
                                autoComplete='off'
                                name="user"
                                onChange={handleChangeReturn}
                            />
                        </label>
                        <br />
                        <datalist id="users">
                            {
                                allUsers?.map((user, key) => (
                                    <option
                                        key={`home-data-u${key}`}
                                        value={`${user.name} | id: ${user.id}`}
                                    />
                                ))
                            }
                        </datalist>
                        <label>
                            Libros Prestados
                            <input
                                list="booksRented"
                                autoComplete='off'
                                name="book"
                                onChange={handleChangeReturn}
                            />
                        </label>
                        <br />
                        <datalist id="booksRented">
                            {
                                booksRented?.map((book, key) => (
                                    <option
                                        key={`home-data-lp${key}`}
                                        value={`${book.name} | id: ${book.id}`}
                                    />
                                ))
                            }
                        </datalist>
                        <button type='submit'>Devolber Libro</button>
                    </form>
                    <br />
                </section>
            </div>
        </div>
    )
}
