const express = require('express');
const Router =express.Router();

Router.get('/contacto', (req,res)=>{
    res.send('CONTACTO');
})
module.exports=Router;
