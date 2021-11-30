# Biblioteca Talenta

Prueba técnica Biblioteca

## Descripción del Proyecto

App creada utilizando React, Node, Sequelize y Postgres.
Consiste en un sistema de administración de una biblioteca.
Ya viene con 20 libros precargados, y tiene la opción de crear
nuevos libros y agregar una imagen para ese libro.
Tiene la opción de crear usuarios los cuales pueden alquilar libros.
Tiene la opción de alquilar los libros disponibles a un usuario
(Un usuario puede alquilar varios libros, pero sólo hay un ejemplar disponible por cada libro).
Tiene la opción de devolver un libro prestado por un usuario y
lo deja nuevamente disponible para que otro usuario lo pueda alquilar.
Tiene las opciones de generar reportes por:
-Todos los ususarios registrados en la App.
-Todos los libros disponibles.
-Todos los libros prestados.
-Los libros alquilados por un usuario específico.

## Organización del proyecto

El Proyecto cuenta con dos carpetas: `api` y `client`.
En estas carpetas está el código del back-end y el front-end respectivamente.

**Api** Contine:

- [ ] Una capeta `src` en la cual se encuentran:

-La carpeta `controlers` donde se encuentran todas las funciones encargadas
de generar la funcionalidad del back-end, se dividen en `users` y `books` respectivamente.

-La carpeta `models` donde se encuentran los modelos de la base de datos,
se dividen en `users` y `books`. Tambien contiene el archivo `index` que es el encargado
de generar la conexión de la base de datos y las relaciones entre los dos modelos mencionados.

-La carpeta `routes` donde se encuentran las diferentes rutas de `/users` y `/books`
con los respectivos métodos http.

-La carpeta `utils` con el archivo config, donde se encuentran las variables de entorno.

-El archivo `app.js` donde se especifican los middlewares necesarios para el
funcionamiento del servidor y se especifica que la ruta principal será: `/api`.
los cuales se
y el ar

- [ ] El archivo `index` en el cual se levanta el servidor y
      se precarga de forma inicial la base de datos con 20 nombres de libros.

- [ ] El archivo `package.json` el cual contine todas las librerias y
      la configuración de los scripts, para arrancar el back-end.

**Client** Contine:

- [ ] Una carpeta `public`, en la cual se aloja el archivo `index.html`,
      que es el punto de entrada de React.

- [ ] Una carpeta `src` en la cual se encuentran:

-La carpeta `assets` donde se encuentran algunas imágenes.

-La carpeta `components` donde se encuentran los componentes utilizados en la App.

-La carpeta `routes` donde se encuentra el archivo `App` en el cual estan
las diferentes rutas del proyecto.

-La carpeta ` styles` donde se encuentran los archivos `css` donde
se encuentran todos los estilos de la App en el archivo `general.css`.

-La carpeta `views`, donde se encuentran todas las vistas
que se renderizan en las diferentes rutas del archivo App.

-El Archivo principal `index` el cual inyecta React en el archivo index.html.

-El Archivo `.gitignore` el cual nos ayuda para que  
la carpeta node_modules, (entre otros) no se exporte.

- [ ] El archivo `package.json` el cual contine todas las librerias y
      la configuración de los scripts, para arrancar el front-end.

[ ]Nota: Esta aplicación ha sido creada con el comando: npx create-react-app.
No se uso redux, ( por lo tanto no se maneja una store, ni reducers, ni actions).
Las diferentes conexiones con el back-end se realizan
en el componente que requiere los datos utilizando la librería axios,
(La cual esta configuara en el principal index.js, de tal forma que está lista para despliege).

## Pasos para desplegar la aplicación el el `localhost`

-Clona este repositorio ubicado en la carpeta que lo desee alojar,
utilizando la consola de git: `git clone https://github.com/WilliamCortes/Talenta.git`.

-Utilizando la consola `psql` Shell en la raiz `postgres=#`: `CREATE DATATABLE library`,
para verifcar si fue creada: `\l`.

-Ubicado en la carpeta `api` utilizando la consola de git: `npm install`,
cuando termine: `npm star` con lo cual debe arrancar el servidor y ver el aviso:
`Servidor corriendo en el puerto 3001`.

- [ ]Nota: Por defecto funcionará en el puerto 3001, para cambiarlo
  se puede hacer en el archivo index.js cambiando el puerto por defecto en la variable port_number.
  En este mismo archivo para que cada ves que se reinicie el servidor, para cambiarlo
  se debe comentar la línea 35 y descomentar la línea 36.

-Ubicado en la carpeta `client` utilizando OTRA consola git: `npm install`,
cuando termine: `npm start` con lo cual se iniciara la aplicación en el navegador por defecto.
Para ingresar abrir una pestaña del browser y poner: `http://localhost:3000/`.

- [ ]Nota: Por defecto la app se desplegará en el puerto 3000. Si se cambió el puerto del servidor
  tambien debe cambiarse la url en la carpeta src, en el archivo index.js en la línea 10,
  modificando el valor de axios.defaults.baseURL.

**Rutas del Back-end**:

-[ ]Método GET:

-http://localhost:3001/api/users
-http://localhost:3001/api/users/`idUsuario`
-http://localhost:3001/api/books
-http://localhost:3001/api/books/rentedBooks
-http://localhost:3001/api/books/availableBooks

-[ ]Método POST:

-http://localhost:3001/api/users
Json: {
"name":"Nombre del nuevo usuario"
}

-http://localhost:3001/api/books
Json:{
"name": "Nombre del nuevo libro",
"image":"url"
}

-http://localhost:3001/api/users/`idUsuario`/book/`IdLibro`

-[ ]Método PUT:

-http://localhost:3001/api/users/`idUsuario`/book/`IdLibro`

## Hecho con ♥ por: ### William Cortes

##WhatsApp: `+57 310 329 83 46`
##LinkedIn: https://www.linkedin.com/in/williamcortesr/

!Chao, Muchas Gracias! 💻
