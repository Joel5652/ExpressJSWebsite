var crypt = require('crypto');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var check = require('express-validator');
var connection = require('../models/data.ts')

var data;

//all users

router.get('/api/users', async (req,res)=>{
    try{
        await connection.query('select id, username from accounts', (err, results, fields)=>{
            res.json(results)
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//get one

router.get('/api/users/:id',getUser, (req,res)=>{
    res.json(res.user)
})

//update one

router.post('/api/users/:id',getUser, async (req,res)=>{
    if(req.body.name.length > 0){
        await connection.query('update accounts set username = ? where id = ?',[req.body.name, res.user.id])
        req.session.username = req.body.name
    }
    if(req.body.email.length > 0){
        await connection.query('update accounts set email = ? where id = ?',[req.body.email, res.user.id])
        req.session.email = req.body.email
        console.log(req.body.email.length);

    }
    if(req.body.password.length > 0){
        let password = req.body.password
        let username = req.session.username
        console.log(req.session);
        
        

        if(password.length >= 8){ 
            password = crypt.createHmac('sha256', username)
                        .update(password)
                        .digest('hex');
    
            await connection.query('update accounts set password = ? where id = ?',[password, res.user.id])
        }
    }
    
    res.redirect('/account')

})

//delete one

router.delete('/api/users/:id', getUser, async (req,res)=>{
    try{
        await connection.query('delete from accounts where id = ? and username = ?',[res.user.id, res.user.username])
        res.json({message: 'Deleted user'})
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

router.post('/api/users/address/:id', getUser, async (req,res)=>{
    let country = req.body.country
    let address = req.body.address
    let city = req.body.city
    let postcode = req.body.postcode
    let mobile = req.body.mobile

    await connection.query('UPDATE accounts SET country = ?, address = ?, city = ?, postcode = ?, mobile = ? WHERE id = ?', [country, address, city, postcode, mobile, res.user.id])

    req.session.country = country
    req.session.address = address
    req.session.city = city
    req.session.postcode = postcode
    req.session.mobile = mobile

    res.redirect('/account')
})

function getUser(req,res,next){
    connection.query('select id, username, password, email from accounts where id = ?',[req.params.id], (err,result,field)=>{
        if(result.length>0){
            res.user = result[0]
        } else {
            return res.status(404).json({message:'Could not find user'})
        }
        next()
    })       
}




module.exports = router