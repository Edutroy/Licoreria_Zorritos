const express = require('express');
const router =express.Router();
const conexion = require('./database/db');
const crud = require('./controller/crud.js');

//Ruta para crear registro de usuarios
router.get('/', (req,res)=>{
    res.render('index');
})


//Muestra los registros de usuarios
router.get('/admin', (req,res)=>{
    conexion.query('SELECT * FROM usuarios',(error, results)=>{
       if(error){
           throw error;
       } else{
               res.render('admin.ejs',{results: results});
           }
       
   })  
})


//Ruta para editar registros

router.get('/edit/:ID_user', (req,res)=>{    
    const ID_user = req.params.ID_user;
    conexion.query('SELECT * FROM usuarios WHERE ID_user=?',[ID_user] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit', {usuarios:results[0]});   
                    
        }        
    });
});

//Ruta para eliminar registros
router.get('/delete/:ID_user', (req, res) => {
    const ID_user = req.params.ID_user;
    conexion.query('DELETE FROM usuarios WHERE ID_user = ?',[ID_user], (error, results)=>{
        if(error){
            throw error;
        }else{           
            res.redirect('admin.ejs');         
        }
    })
});

router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports=router;
