const express = require('express');
const router =express.Router();
const conexion = require('./database/db');
const crud = require('./controller/crud.js');

//Ruta para crear registro de usuarios
 /* router.get('/', (req,res)=>{
    res.render('index');
}) 
 */

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
              
        res.redirect('/admin');
        } 
    })
});

router.post('/save', crud.save);
router.post('/update', crud.update);
//router.post('/authenticate',crud.authenticate);


//GESTION DE PRODUCTOS

//Muestra los registros de usuarios
router.get('/admin_products', (req,res)=>{
    conexion.query('SELECT * FROM productos',(error, results)=>{
       if(error){
           throw error;
       } else{
               res.render('admin_products.ejs',{results: results});
           }
       
   })  
});

//Ruta para editar registros_productos

router.get('/edit_products/:ID_producto', (req,res)=>{    
    const ID_producto = req.params.ID_producto;
    conexion.query('SELECT * FROM productos WHERE ID_producto=?',[ID_producto] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit_products', {productos:results[0]});   
                    
        }        
    });
});


//Ruta para eliminar registros
router.get('/delete/:ID_producto', (req, res) => {
    const ID_producto = req.params.ID_producto;
    conexion.query('DELETE FROM productos WHERE ID_producto = ?',[ID_producto], (error, results)=>{
        if(error){
            throw error;
        }else{           
              
        res.redirect('/admin_products');
        } 
    })
});


module.exports=router;
