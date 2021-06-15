var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'joel',
    database: 'nodelogin'
})

connection.connect((err)=>{
    if(err){
        console.log(err);
        
    }else{
        console.log('Successfully connected to MySql database');
    }
})

module.exports = connection