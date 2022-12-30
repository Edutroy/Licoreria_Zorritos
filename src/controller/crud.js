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
            res.render('index' , {
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
    conexion.query('UPDATE usuarios SET ? WHERE ID_user = ?',[{nombre_user:Nombre_user, apellido_user:Apellido_user,telefono_user:telefono_user,DNI_user:DNI_user,correo_user:correo_user,contraseña_user:contraseña_user}, ID_user], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('admin');         
        }
});};








