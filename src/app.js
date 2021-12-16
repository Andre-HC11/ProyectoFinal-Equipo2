const express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection');


const app = express();


// Importando rutas importing routes
const customerRoutes = require('./routes/encuestas');

// settings Desplegarlo en la nuve solo para cambiar por el puerto y si no usar el port 3000
app.set('port', process.env.PORT || 3000);
//donde esta la carpeta views __dirname es una ruta que lleva hasta views y es multiplataforma
app.set('views', path.join(__dirname, 'views'));
//motor de plantillas ejs
app.set('view engine', 'ejs');

// middlewares /producto /clientes rutas de nuestro servidor (procesar los datos antes)
app.use(morgan('dev'));
//conexión a BD
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'helixandre',
    port: 3306,
    database: 'bd_encuestass'
}, 'single'));
// nos permite entender todos los datos que vengan en el formulario de crear encuestas
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', customerRoutes);

// static files img, framework, mis atrchivos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});