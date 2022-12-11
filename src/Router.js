const express = require('express');
const Router =express.Router();

const conexion = require ('./database/db');

Router.get('/', (req,res)=>{
    conexion.query('SELECT* FROM usuarios',(error,results)=>{
        if(error){
            throw error;}
            else{
                res.send(results);
            }
        
    })
})
module.exports=Router;
