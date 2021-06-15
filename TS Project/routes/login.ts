var crypt = require('crypto');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var check = require('express-validator');
var connection = require('../models/data.ts')

let invalidLogin;
let invalidAcc;


router.post('/api/users/create', (req, res)=>{
    
    let username = req.body.createUsername
    let password = req.body.createPassword
    let email = req.body.email

    if(username){
        connection.query('SELECT username FROM accounts WHERE username = ?', [username], (err, results, fields) =>{
            if(results.length > 0){
                invalidAcc = 'This username already exsists'
                res.redirect('/login')
            } 
            else
            {
                if(password.length >= 8){

                    password = crypt.createHmac('sha256', username)
                    .update(password)
                    .digest('hex');

                    invalidAcc = 'Account created successfully!'
                    connection.query('INSERT INTO accounts VALUES (id,?,?,?,null,null,null,null,null)', [username, password, email])
                    res.redirect('/login')
                } else {
                    invalidAcc = 'Passwords must contain at least 8 characters!'
                    res.redirect('/login')
                }
            }
        })
    }    
})

router.post('/api/users/auth', (req, res)=>{
    let username = req.body.username
    let password = req.body.password

    password = crypt.createHmac('sha256', username)
                    .update(password)
                    .digest('hex');

    if (username && password){
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password],(error, results, fields)=>{
            

            if(results.length > 0){
                req.session.loggedin = true
                req.session.username = username
                req.session.userID = results[0].id
                req.session.email = results[0].email
                req.session.country = results[0].country
                req.session.address = results[0].address
                req.session.city = results[0].city
                req.session.postcode = results[0].postcode
                req.session.mobile = results[0].mobile
                req.session.userError = ''
                res.redirect('/loading')
            } else {
                invalidLogin = 'Incorrect username or password!'
                res.redirect('/login')
            }
        })
    } else {
        res.send('Please enter Username and Password!');
		res.end();
    }
})


router.get('/login', (req, res)=>{
    
    if (req.session.loggedin == true) {
        res.redirect('/account');
    } else {
        res.render('../views/login', {message: invalidLogin, message2: invalidAcc})
        invalidLogin ='';
        invalidAcc ='';
    } 
    
})

module.exports = router;




