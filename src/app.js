const express = require ('express');//referenciamos exprre
const app =express(); //invocamos con su clase

app.set('view engine','ejs');//invocar motor de plantillas

app.use(express.static('public'));
 app.use(express.urlencoded({extended:false}));
app.use(express.json()); 
app.use('/', require('./router'));

app.listen(5000, ()=>{
console.log ('SERVER corriendo en http://localhost:5000');
});//invocamos todos los metodos de express