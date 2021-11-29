import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Navbar } from '../components/Navbar';

export const CreateUser = () => {
    const initialState = { name: '' };
    const [input, setInput] = useState(initialState);

    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value, });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (input.name) {
            const response = await axios.post(`/api/users/`, input);
            setInput(initialState);
            swal({
                title: "¡Listo!",
                text: `${response.data.name} ha sido agregado exitosamente`,
                icon: "success",
            });
        } else {
            swal({
                title: "¡Lo siento!",
                text: `Debes agregar el nombre del ususario`,
                icon: "warning",
            });
        }
    }
    return (
        <div>
            <Navbar />
            <section>
                <h2>Crear un nuevo Usuario</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Por favor ingresa el nombre completo del nuevo usuario</label>
                    <input type='text' name='name' value={input.name} onChange={(e) => handleChange(e)} />
                    <input type='submit' value='Crear Usuario' />
                </form>
            </section>
        </div>
    )
}
