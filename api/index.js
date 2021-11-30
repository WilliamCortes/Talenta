//Listado de libros para cargar la base de datos inicialmete
const initialBooks = [
    { name: "Fotografía Digital para Profesionales", image: 'url' },
    { name: "Música Digital", image: 'url' },
    { name: "Hardware y componentes", image: 'url' },
    { name: "Consigue las Mejores Fotos con Tu Cámara Digital", image: 'url' },
    { name: "Wireless. Los mejores trucos", image: 'url' },
    { name: "Kotlin Notes for Professionals", image: 'url' },
    { name: "JavaScript Notes for Professional", image: 'url' },
    { name: "MongoDB Notes for Professionals", image: 'url' },
    { name: "HTML5 Notes for Professionals", image: 'url' },
    { name: "React Native Notes for Professionals", image: 'url' },
    { name: "HTML5 Canvas Notes for Professionals", image: 'url' },
    { name: "TypeScript Notes for Professionals", image: 'url' },
    { name: "jQuery Notes for Professionals", image: 'url' },
    { name: "POO y MVC en PHP", image: 'url' },
    { name: "Practical Artifical Intelligence Programming with Java", image: 'url' },
    { name: "Herramientas", image: 'url' },
    { name: "Desarrollo de Software", image: 'url' },
    { name: "Fundamentos de jQuery", image: 'url' },
    { name: "Desarrollo de aplicaciones iPhone e iPad para principiantes", image: 'url' },
    { name: "Introducción a .NET", image: 'url' },
]

const app = require('./src/app');
const { conn } = require('./src/models');
const { Book } = require('./src/models');
require("dotenv").config()

const port_number = process.env.PORT || 3001;
const host = '0.0.0.0';


conn.sync({
    force: true
    // force: false
}).then(async () => {
    await Book.bulkCreate(initialBooks);
    app.listen(port_number, host, () => {
        console.log(`Servidor corriendo en el puerto ${port_number}`)
    });
});

