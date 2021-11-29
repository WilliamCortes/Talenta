import React from 'react';
import { NavLink } from 'react-router-dom';


export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
            </ul>
            <ul>
                <li><NavLink to='/createUser'>Crear Usuario</NavLink></li>
            </ul>
            <ul>
                <li><NavLink to='/createBook'>Crear Libro</NavLink></li>
            </ul>
        </nav>
    )
}
