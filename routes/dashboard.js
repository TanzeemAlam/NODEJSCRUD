const express = require('express')
const router  = express.Router();
const User = require('./user')
const connection = require('./connection');

router.get('/dashboard', (req,res,next)=>{
    res.render('dashboard');
})

router.get('/addband', (req,res,next)=>{
    
    console.log("body",req.body);
    console.log('Band added');
    res.render('dashboard');
})

module.exports = router;