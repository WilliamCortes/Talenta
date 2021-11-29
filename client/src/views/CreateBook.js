import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import loader from '../assets/loading.gif';
import { Navbar } from '../components/Navbar';

export const CreateBook = () => {
    const initialState = { name: '', image: 'url', };
    const [input, setInput] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value, });
    }

    const uploadImage = async (e) => {
        setLoading(false)
        const files = e.target.files;
        const images = new FormData();
        const axiosInstance = axios.create();
        delete axiosInstance.defaults.headers.common['authorization']
        images.append("file", files[0]);
        images.append("upload_preset", "beti-work");
        await axiosInstance
            .post(
                "https://api.cloudinary.com/v1_1/dkwdjfwfc/image/upload",
                images,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            .then((res) => {
                setInput({ ...input, image: res.data.secure_url });
                setLoading(true)
            })
            .catch((err) => console.log('CreateBook.js/Error: ', err));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (input.name) {
            const response = await axios.post(`/api/books/`, input);
            setInput(initialState);
            swal({
                title: "¡Listo!",
                text: `${response.data.name} ha sido agregado exitosamente`,
                icon: "success",
            });
        } else {
            swal({
                title: "¡Lo siento!",
                text: `Debes agregar el nombre del libro`,
                icon: "warning",
            });
        }
    }
    return (
        <div>
            <Navbar />
            <section>
                <h2>Agregar un nuevo Libro</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Por favor ingresa el nombre completo del libro que deseas agregar</label>
                    <input type='text' name='name' value={input.name} onChange={(e) => handleChange(e)} />
                    {loading ?
                        <>
                            {input.image.length > 3 && <img src={input?.image} alt='Imagen del libro' />}
                            <label>Agregar una imagen del libro</label>
                            <input
                                className='home_input_img'
                                name="picture"
                                accept="image/*" type='file'
                                onChange={uploadImage}
                            />
                        </>
                        :
                        <img className='home_loading' src={loader} alt='Cargando' />
                    }
                    <input type='submit' value='Agregar Libro' />
                </form>
            </section>
        </div>
    )
}