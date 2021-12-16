//tenemos nuestros metodos para formar parte de un objeto 
//van nuestros metodo para nuestro CRUD

const res = require("express/lib/response");

const controller ={};

/////////////////////////////////////////////////////////////////////////////////

controller.Iniciar_Cuestionario = (req, res) => {
    req.getConnection((err, conn) =>{
        conn.query('SELECT DISTINCT Titulo_encuesta FROM tb_encuesta', (err, encuestas) =>{
        if(err){
            res.json(err);
        }
//console.log(res.json(encuestas[0].Titulo_encuesta) +" tenomos de la bd encuestas");        
        res.render('Iniciar_Cuestionario', {
            data:  encuestas   
        });
        });
            }); 
    
    }
//////////////////////////////conocer la encuesta a cargar/////////////////////////////////////////////////////////////////


controller.titulo = (req, res) => {
    req.getConnection((err, conn) =>{

    console.log(req.params.idtb_encuesta);
      const { idtb_encuesta } = req.params;
        conn.query('SELECT * FROM tb_encuesta WHERE Titulo_encuesta = ?',[idtb_encuesta], (err, encuestas) =>{
        if(err){
            res.json(err);
        }
//console.log(res.json(encuestas[0].Titulo_encuesta) +" tenomos de la bd encuestas");        
        res.render('contestarPreguntas', {
            preguntas:  encuestas   
        });
        });
            });     
    }

///////////////////////////////////////////////////////////////////////////////
controller.vista_preguntas = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tb_encuesta', (err, customers) => {
         if (err) {
          res.json(err);
         }
         res.render('CuestionarioNuevo', {
            data: customers
         });
        });
      });
    
    
//    res.render('');
    
    }

//////////////////////////////////////////////////////////////////////////////////
controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
      const query = connection.query('INSERT INTO tb_encuesta set ?', data, (err, customer) => {
        console.log(customer)
        res.redirect('/');
      })
    })
  };

//////////////////////////////////////////////////////////////////////////////////
controller.addUser = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
      const query = connection.query('INSERT INTO tb_login set ?', data, (err, customer) => {
        console.log(customer)
        res.redirect('/');
      })
    })
  };

  

///////////////////////////////////////////////////////////////////////////////////////////////////////
controller.list = (req, res) => {
    //res.send('Hellow World');
    req.getConnection((err, conn) =>{
conn.query('SELECT * FROM tb_encuesta', (err, encuestas) =>{
if(err){
    res.json(err);
}//le pasamos la data de los usuarios
//desmarcar para ver en consola resultados
//console.log(encuestas);
res.render('CuestionarioNuevo', {
    data:  encuestas   
});
});
    });
};

controller.delete = (req, res) => {
    // res.send('Hellow World');
 //console.log(req.params.id);
     const { id } = req.params;// desde req.params quiero su propiedad id
     req.getConnection((err, connection) => {
     connection.query('DELETE FROM tb_encuesta WHERE idtb_encuesta = ?', [id], (err, rows) => {
     res.redirect('/CuestionarioNuevo');
       });
     });
   }

////////////////////////////////////////////////////

controller.Registrarse = (req, res) => {
    res.render('Registrarse');
    
    }

    


/*

controller.list = (req, res) => {
    //res.send('Hellow World');
    req.getConnection((err, conn) =>{
conn.query('SELECT * FROM tb_encuesta', (err, encuestas) =>{
if(err){
    res.json(err);
}//le pasamos la data de los usuarios
//desmarcar para ver en consola resultados
//console.log(encuestas);
res.render('index', {
    data:  encuestas   
});
});
    });
};

//salvar datos del formulario
//console.log(req.body);

controller.save = (req, res) => {
    const data =req.body;
  
req.getConnection((err, conn) => {
    conn.query('INSERT INTO tb_encuesta set ?', [data], (err, encuestas) => {
        console.log(encuestas);
       res.redirect('/');   //volvemos a mi ruta de inicio
    });
})
};

controller.delete = (req, res) => {
   // res.send('Hellow World');
//console.log(req.params.id);
    const { id } = req.params;// desde req.params quiero su propiedad id
    req.getConnection((err, connection) => {
    connection.query('DELETE FROM tb_encuesta WHERE idtb_encuesta = ?', [id], (err, rows) => {
    res.redirect('/');
      });
    });
  }

/////////////////////VISTAS////////////////////////////////////////////////////

controller.vista_user = (req, res) => {
res.render('user');

}

///////////////////////////////////////////////////////////////////////////////
controller.vista_resultados = (req, res) => {
    res.render('Resultados_Encuesta');
    
    }



///////////////////////////////////////////////////////////////////////////////

controller.Mis_Resultados = (req, res) => {
    res.render('Mis_Resultados');  
    }

//////////////////////Metodo validar Usuario/////////////////////////////
*/
controller.principal = (req, res) => {
  res.render('index');
}

controller.validarUsuario = (req, res) => {
    //res.send('Hellow World');
    console.log(req.body);
    const {correo}= req.body;
    const {contrasena}= req.body;
    //console.log(correo+" es lo que trae la constante");

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM tb_login WHERE correo = ? and contrasena = ? ", [correo,contrasena], (err, customers) => {
         if (err) {
            
          res.json(err);

         }

         if(customers==""){
            res.render('index');
           }else{

                    // res.json(customers);
                    const vista= customers[0].rol;
   
                    //console.log(res.json(customers[0].rol) +" tenomos de la bd 1");
                if(vista=="Administrador"){
                    res.render('Admin');
                }else{
                    if(vista=="Usuario"){
                    res.render('user');
                }
                }
            }
        });
      });
    
}











module.exports = controller;