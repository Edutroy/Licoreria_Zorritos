const express = require ('express');//referenciamos exprre
const app =express(); //invocamos con su clase

app.set('view engine','ejs');//invocar motor de plantillas
app.use('/',require('./routes/Router'));
app.listen(5000, ()=>{
console.log ('SERVER corriendo en http://localhost:5000');
});//invocamos todos los metodos de express