const bodyParser = require('body-parser');
const path = require('path');
var express = require('express');
const session = require('express-session');
const app = express();
const loginRouter = require('../routes/login.ts')
const usersRouter = require('../routes/users.ts')


app.set('view engine', 'pug')
app.set('views', 'views')  

app.use(session({
    key:'account',
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))


app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.use('/static',express.static('static'))

//ROUTES



app.use(loginRouter)

app.use(usersRouter)

app.get('/', (req, res) =>{
	if (req.session.loggedin) {
        res.render('../views/index', {script: "static/js/login.js", username: req.session.username, loggedin: req.session.loggedin})
	} else {
		res.render('../views/index'), {script: "static/js/login.js"};
	}
	res.end();
});

app.get('/loading', (req, res) =>{	
	res.render('../views/loading')
});


app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/loading')
})

app.get('/account', (req, res)=>{

    if(req.session.loggedin == undefined){
        res.redirect('/login')
    } else {
        res.render('../views/account',{
            userID: req.session.userID,
            username: req.session.username, 
            loggedin: req.session.loggedin, 
            email: req.session.email,
            country: req.session.country,
            address: req.session.address,
            city: req.session.city,
            postcode: req.session.postcode,
            mobile: req.session.mobile,
            userError: req.session.userError
        })
    }
    res.end();
})


app.get('*', (req, res)=>{
    res.render('../views/404')
})

module.exports = app


