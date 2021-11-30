import React from 'react';
import portada from '../assets/Portada.jfif';

export const CardBook = ({ book }) => {

    return (
        <div className='card_book'>
            {book.image.length > 5 ?
                < img src={book.image} alt={`Imagen del libro:  ${book.name}`} />
                :
                <img src={portada} alt={`Imagen del libro:  ${book.name}`} />
            }
            <h4>{book.name}</h4>
        </div>
    )
}
