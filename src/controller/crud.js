//Invocamos a la conexion de la DB
const conexion = require('../database/db');

//GUARDAR un REGISTRO
exports.save =  (req, res)=>{
    const Nombre_user = req.body.Nombre_user;
    const Apellido_user = req.body.Apellido_user;
    const telefono_user = req.body.telefono_user;
    const DNI_user = req.body.DNI_user;
    const correo_user = req.body.correo_user;
    const contraseña_user= req.body.contraseña_user;
    // console.log(Nombre_user+"-"+Apellido_user+"-"+telefono_user+"-"+DNI_user+"-"+Direccion_user+"-"+password_user);
    
     conexion.query('INSERT INTO usuarios SET ?',{nombre_user:Nombre_user, apellido_user:Apellido_user,telefono_user:telefono_user,DNI_user:DNI_user,correo_user:correo_user,contraseña_user:contraseña_user}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('login' , {
				alert: true,
				alertTitle: "Registration",
				alertMessage: "¡Successful Registration!",
				alertIcon:'success',
				showConfirmButton: false,
				timer: 1400,
				ruta: ''
            } );      
       
        }
}); 
 };
 //ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const ID_user=req.body.ID_user;
    const Nombre_user = req.body.Nombre_user;
    const Apellido_user = req.body.Apellido_user;
    const telefono_user = req.body.telefono_user;
    const DNI_user = req.body.DNI_user;
    const correo_user = req.body.correo_user;
    const contraseña_user= req.body.contraseña_user;
    conexion.query('UPDATE usuarios SET ? WHERE ID_user = ?',[{nombre_user:Nombre_user, apellido_user:Apellido_user,
                                                                telefono_user:telefono_user,DNI_user:DNI_user,correo_user:correo_user,
                                                                contraseña_user:contraseña_user}, ID_user], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('admin');         
        }
});};







//PARA LOS PRODUCTOS

//GUARDAR un REGISTRO_products
 exports.save_product =  (req, res)=>{
    const Nombre_producto = req.body.Nombre_producto;
    const codigo_producto = req.body.codigo_producto;
    const proovedor = req.body.proovedor;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const photo_producto = req.body.photo_producto;
    // console.log(Nombre_user+"-"+Apellido_user+"-"+telefono_user+"-"+DNI_user+"-"+Direccion_user+"-"+password_user);
    
     conexion.query('INSERT INTO productos SET ?',{Nombre_producto:Nombre_producto, codigo_producto:codigo_producto,proovedor:proovedor,precio:precio,stock:stock,photo_producto:photo_producto}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
             res.redirect("admin_products")
        }
}); 
 }; 

exports.update_products =  (req, res)=>{
    const ID_producto=req.body.ID_producto;
    const Nombre_producto = req.body.Nombre_producto;
    const codigo_producto = req.body.codigo_producto;
    const proovedor = req.body.proovedor;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const photo_producto = req.body.photo_producto;
    // console.log(Nombre_user+"-"+Apellido_user+"-"+telefono_user+"-"+DNI_user+"-"+Direccion_user+"-"+password_user);
    
     conexion.query('UPDATE productos SET ? WHERE ID_producto = ?',[{Nombre_producto:Nombre_producto, codigo_producto:codigo_producto,proovedor:proovedor,precio:precio,stock:stock,photo_producto:photo_producto}, ID_producto], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('admin_products');  
       
        }
}); 
 }; 




