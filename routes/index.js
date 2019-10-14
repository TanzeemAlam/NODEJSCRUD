const express = require('express')
const router  = express.Router();
const User = require('./user');
const Band = require('./band');
const connection = require('./connection');

router.get('/', (req,res,next)=>{
    res.render('login')
})

router.post('/login',(req,res,next)=>{
    console.log('Logging In....');

    const { useremail, password } = req.body;
    console.log("Useremail:",useremail);
    console.log("Password:",password);

    User.findOne({ where: {USER_EMAIL:useremail, USER_PASSWORD:password} }).then(note => {
        let data = note.get({ plain: true });

        console.log("Username:",data['USER_NAME']);
        console.log(data['USER_ID']);

        req.session.name= data['USER_NAME'];
        req.session.userid = data['USER_ID'];
        
        res.redirect('/dashboard');

    }).catch((err) =>{
        res.send("Incorrect Useremail/Password");
    });
})

router.get('/logout',(req,res)=>{
    res.redirect('/');
});

router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req,res,next)=>{
    const {username, useremail, company,dob, password1, password2} = req.body;
    //console.log(req.body);
    
    if(!username || !useremail || !company || !dob || !password1 || !password2)
        res.send('Some fields are empty');
    else if(password1 != password2)
        res.send('Password doesnt match');
    else{
    
        connection.sync().then(function () {
            User.create({
                USER_NAME:username,
                USER_COMPANY:company,
                USER_DOB:dob,
                USER_EMAIL: useremail,
                USER_PASSWORD: password1
            }).then(function (data) {
        })
        });
        
        res.render('login');
    }
});

//Band routes
router.get('/dashboard', (req,res)=>{

    let bandList = [];

    Band.findAll({where:{USER_ID:req.session.userid}}).then(note => {
        let data = note;
        //console.log(data);
        bandList = data;
        res.render('dashboard', {name: req.session.name, bandList:bandList});
    }).catch((err)=>{
        res.send("Error in finding band data")
    })    
});

router.post('/addband', (req,res)=>{
    const {name, description} = req.body;

    connection.sync().then(function () {
        Band.create({
            BAND_NAME:name,
            BAND_DESCRIPTION:description,
            USER_ID:req.session.userid        
        }).then(function (data) {
            console.log('Band added');
        })
    });    

    res.redirect('/dashboard')
});

router.get('/delete/:id', (req,res)=>{

    let bandId=req.params.id;
    console.log("Deleting id:",bandId);
    connection.sync().then(function(){
        Band.findByPk(bandId).then((band)=>{
            return band.destroy();
        }).then(()=>{
            res.redirect('/dashboard');
        }).catch((err)=>{
            res.send('Error')
        })
    })    
});

router.get('/update/:id', (req,res)=>{
    let bandId = req.params.id;
    console.log("Updating id:", bandId);

    req.session.bandid = bandId;
    res.render('update')
});

router.post('/update', (req,res)=>{

    const {bandname, banddescription} = req.body;
    let bandId = req.session.bandid;

    connection.sync().then(function(){
        Band.findByPk(bandId).then((band)=>{
            return band.destroy();
        })
    });

    connection.sync().then(function () {
        Band.create({
            BAND_NAME:bandname,
            BAND_DESCRIPTION:banddescription,
            USER_ID:req.session.userid        
        }).then(function (data) {
            console.log('Band added');
        })
    });   

    res.redirect('/dashboard')

});
module.exports = router;