import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Navbar } from '../components/Navbar.js';
import { CardBook } from '../components/CardBook.js';

export const Home = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [booksRented, setBooksRented] = useState([]);
    const [booksAvailable, setBooksAvailable] = useState([]);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [userIdState, setuserIdState] = useState(null);
    const [userIdResult, setUserIdResult] = useState({ name: '', books: [] });

    useEffect(() => {
        const chargeData = async () => {
            const booksAvailable = await axios.get(`/api/books/availableBooks/`);
            setBooksAvailable(booksAvailable.data);
            const users = await axios.get(`/api/users/`);
            setAllUsers(users.data);
        };
        chargeData();
    }, []);

    const handleChandeUserId = (event) => {
        if (event.target.value) {
            let id = parseInt(event.target.value.split(':')[1]?.trim());
            setuserIdState(id)
        }
    };

    const getUserId = async () => {
        if (userIdState) {
            const response = await axios.get(`/api/users/${userIdState}/`);
            setuserIdState(null);
            setUserIdResult({ name: response.data.name, books: response.data.Books });
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
    };

    const getAllUsers = async () => {
        setShowAllUsers(true);
        setAllBooks([]);
        setBooksRented([]);
    };

    const getAllBooks = async () => {
        const books = await axios.get(`/api/books/`);
        setAllBooks(books.data);
        setShowAllUsers(false);
        setBooksRented([]);
    };

    const getRentedBooks = async () => {
        const booksRentedResponse = await axios.get(`/api/books/rentedBooks/`);
        if (booksRentedResponse) {
            setBooksRented(booksRentedResponse.data);
            setShowAllUsers(false);
            setAllBooks([]);
        }
    };

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <section className='home_buttons'>
                <button onClick={() => getAllUsers()}>Lista Usuraios</button>
                <button onClick={() => getAllBooks()}>Lista Libros</button>
                <button onClick={() => getRentedBooks()}>Reporte de Libros Alquilados</button>
                <div>
                    <button onClick={() => getUserId()}>Ver Libros Alquilados por un usuario</button>
                    <input
                        list="userId"
                        autoComplete='off'
                        name="userId"
                        onChange={handleChandeUserId}
                        placeholder='Seleciona un usuario'
                    />
                    <datalist id="userId">
                        {
                            allUsers?.map((user, key) => (
                                <option
                                    key={`home-data-u${key}`}
                                    value={`${user.name} | id: ${user.id}`}
                                />
                            ))
                        }
                    </datalist>
                </div>
            </section>

            <h1>Conoce Todos Nuestros Libros Disponibles</h1>
            <main className='home_contaiener'>
                {booksAvailable?.map((book, key) => (
                    <CardBook key={`book-${key}`} book={book} />
                ))

                }
            </main>
            {/* seccion donde estan todos los madales */}
            <div>
                {userIdResult?.name?.length &&
                    <section className='home_modal'>
                        <div>
                            <button onClick={() => setUserIdResult({ name: '', books: [] })}>&#735;</button>
                            <h2>Libros alquilados por {userIdResult.name}</h2>
                            {
                                userIdResult.books.length ?
                                    userIdResult.books.map((book, key) => (
                                        <li key={`home-book${key}`}>{book.name}</li>
                                    ))
                                    :
                                    <p>Este Usuario <strong> NO </strong>tiene libros alquilados</p>
                            }
                        </div>
                    </section>
                }

                {allBooks.length &&
                    <section className='home_modal'>
                        <div>
                            <button onClick={() => setAllBooks([])}>&#735;</button>
                            <h2>Total de libros de la biblioteca</h2>
                            {
                                allBooks?.length ?
                                    allBooks.map((book, key) => (
                                        <li key={`home-book${key}`}>{book.name}</li>
                                    ))
                                    : null
                            }
                        </div>
                    </section>
                }

                {showAllUsers &&
                    <section className='home_modal'>
                        <div>
                            <button onClick={() => setShowAllUsers(false)}>&#735;</button>
                            <h2>Total de usuarios disponibles</h2>
                            {
                                allUsers?.length ?
                                    allUsers.map((user, key) => (
                                        <li key={`home-user${key}`}>{user.name}</li>
                                    ))
                                    : null
                            }
                        </div>
                    </section>
                }

                {booksRented?.length &&
                    <section className='home_modal'>
                        <div>
                            <button onClick={() => setBooksRented([])}>&#735;</button>
                            <h2>Libros Alquilados</h2>
                            {
                                booksRented?.length ?
                                    booksRented.map((book, key) => (
                                        <li key={`home-book${key}`}>{book.name}</li>
                                    ))
                                    : null
                            }
                        </div>
                    </section>
                }
            </div>
        </div>
    )
}
