const express = require('express');//referenciamos exprre
const app =express(); //invocamos con su clase
//invocar motor de plantillas
app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json()); 
/*   app.get('/',(req, res)=>{
	res.render('index');
})  */  
const conexion = require('./database/db');
app.use('/', require('./router'));
//invocar a dotenv
const dotenv =require('dotenv');
dotenv.config({path:'./env/.env'});
// el directorio public
app.use(express.static('public'));
//Invocamos a bcryptjs
const bcryptjs=require('bcryptjs');
// VAR de session
const session =require('express-session');
app.use(session({
    secret:'12345678',
    resave:true,
    saveUninitialized:true
}));
//metodo de autenticacion
app.post('/authenticate', async (req, res)=> {
	const correo_user = req.body.correo_user;
	const contraseña_user = req.body.contraseña_user;    
	if (correo_user && contraseña_user) {
		conexion.query('SELECT * FROM usuarios WHERE correo_user = ?', [correo_user], async (error, results,fields)=> {
			if( (results.length == 0) || (contraseña_user!=results[0].contraseña_user) ) {    
				res.render('test', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "USUARIO y/o PASSWORD incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: 1100,
                        ruta: ''     
                    } );
				
				//Mensaje simple y poco vistoso
                //res.send('Incorrect Username and/or Password!');				
			} else {         
				//creamos una var de session y le asignamos true si INICIO SESSION       
				req.session.loggedin = true;                
				req.session.Nombre_user = results[0].nombre_user;
				console.log(correo_user +'_' + results[0].nombre_user + contraseña_user +'_' +'exitoso');
                //res.render('test');
				 res.render('test'/*  , {
					alert: true,
					alertTitle: "Conexión exitosa",
					alertMessage: "¡LOGIN CORRECTO!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: false,
					ruta: ''
				} */  )
				; 
				       			
			}			
			res.end();
		});
	} else {	
		console.log(correo_user +'_' + contraseña_user +'ingrese usuario y contraseña');
        res.render('test' ,{
            alert: true,
			alertTitle: "Conexión Fallida",
			alertMessage: "¡Por favor ingrese USUARIO y CONTRASEÑA!",
			alertIcon:'warning',
			showConfirmButton: true,
			timer: false,
			ruta: ''
        }
		 );
			}
});
//12-Auth pages
app.get('/', (req, res)=> {
	if (req.session.loggedin) {
		console.log(req.session.Nombre_user);
		res.render('index',{
			login:true,
			name: req.session.Nombre_user,
		 		
		});		
	} else {
		res.render('index',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
});

app.listen(5000, ()=>{
console.log ('SERVER corriendo en http://localhost:5000');
});//invocamos todos los metodos de express