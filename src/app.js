const express = require('express');//referenciamos exprre
const app =express(); //invocamos con su clase
//invocar motor de plantillas
app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json()); 

 app.get('/login',(req, res)=>{// es importante colocar el slah al momento de trazar una ruta
	res.render('login');
});   

app.get('/admin_sales',(req, res)=>{// es importante colocar el slah al momento de trazar una ruta
	res.render('admin_sales');
}); 
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
    saveUninitialized:true,
	
}));

//metodo de autenticacion
app.post('/authenticate', async (req, res)=> {
	const correo_user = req.body.correo_user;
	const contraseña_user = req.body.contraseña_user;    
	if (correo_user && contraseña_user) {
		conexion.query('SELECT * FROM usuarios WHERE correo_user = ?', [correo_user], async (error, results,fields)=> {
			if( (results.length == 0) || (contraseña_user!=results[0].contraseña_user) ) {    
					 res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "USUARIO y/o PASSWORD incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: 1100,
                        ruta: 'login'     
                    } );
				
				//Mensaje simple y poco vistoso
                //res.send('Incorrect Username and/or Password!');				
			}/* if(correo_user=='admin' && contraseña_user=='admin'){
				console.log(correo_user +'&'+ contraseña_user);
				window.open('admin');
			} */ else {         
				//creamos una var de session y le asignamos true si INICIO SESSION       
				req.session.loggedin = true;                
				req.session.Nombre_user = results[0].nombre_user;
				console.log(correo_user +'_' + results[0].nombre_user + contraseña_user +'_' +'exitoso');
                //res.render('test');
				res.render('login'  , {
					alert: true,
					alertTitle: "Conexión exitosa",
					alertMessage: "¡LOGIN CORRECTO!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: false,
					ruta: ''
				}   )
				;  
				       			
			}			
			res.end();
		});
	} else {	
		console.log('ingrese usuario y contraseña');
         res.render('login' ,{
            alert: true,
			alertTitle: "Advertencia",
			alertMessage: "¡Por favor ingrese usuario y/o contraseña!",
			alertIcon:'warning',
			showConfirmButton: true,
			timer: false,
			ruta: 'login'
        }
		 ); 
			}
});

//12-Auth pages
app.get('/', (req, res)=> {
	if (req.session.loggedin) {
	
		return res.render('index',{
			login:true,
			name: req.session.Nombre_user,
		 		
		});		
	} else {
		res.render('index',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	
/* 	conexion.query('SELECT * FROM productos',(error, results)=>{
		if(error){
			console.log("Hello, this is error ==>")
			throw error;
		} else{
			return res.render('index',{results: results});
			}
		
	});  */
	return res.end();


});
//función para limpiar la caché luego del logout
 app.use(function(req, res, next) {
    if (!req.usuarios)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
}); 

 //Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});

app.listen(5000, ()=>{
console.log ('SERVER corriendo en http://localhost:5000');
});//invocamos todos los metodos de express