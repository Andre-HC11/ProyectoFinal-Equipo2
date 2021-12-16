//Aquí van todas las rutas de nuestro sevidor
const express = require('express');
const router = express.Router();

/*
router.get('/', (req, res) => {
    res.send('Hellow World');
});
*/
//../controllers/encuestaController --La ruta donde esta mi archivo
const encuestaController = require('../controllers/inicioController');

router.get('/Registrarse', encuestaController.Registrarse);
router.post('/addUser',encuestaController.addUser);//recibe valores
router.get('/delete/:id',encuestaController.delete);//regresa valores
router.post('/add',encuestaController.save);//recibe valores
router.get('/CuestionarioNuevo',encuestaController.vista_preguntas);//recibe valores
router.get('/titulo/:idtb_encuesta',encuestaController.titulo);//recibimos data
router.get('/Iniciar_Cuestionario',encuestaController.Iniciar_Cuestionario);
router.post('/validarUsuario',encuestaController.validarUsuario);//recibimos data
router.get('*', encuestaController.principal);


/*
router.get('/listar', encuestaController.list);

router.get('/delete/:id',encuestaController.delete);//regresa valores


/////////VISTAS/////////////////////////////////////////////////////////////////////////////////
router.get('/user',encuestaController.vista_user);//recibe valores

router.get('/Resultados_Encuesta',encuestaController.vista_resultados);//recibe valores

router.get('/Mis_Resultados',encuestaController.Mis_Resultados);
router.get('/registrarse',encuestaController.registrarse);
////////////////////////////////Agregar ////////////////////////////////////////

*/





module.exports =router;