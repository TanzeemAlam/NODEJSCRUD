const express = require('express');
const app = express();
const session = require('express-session')



const expressLayouts = require('express-ejs-layouts');


//Body parser
app.use(express.urlencoded({extended:false}));

// //template engine
 app.use(expressLayouts)
 app.set('view engine', 'ejs');

//express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}));

//Router for index page
app.use('/', require('./routes/index'));


app.listen(8888, ()=> { console.log('Running on port 8888 http://localhost:8888/')})