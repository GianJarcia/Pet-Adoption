var express = require('express');

const jwt = require('jsonwebtoken');

var router = express.Router();

var dbConn = require('../../config/db');

//SIGNUP
router.post('/signup',(req,res,next)=>{
    var userid = "";
    var email = req.body.email;
    var password = req.body.password;
    
    try {

        sqlQuery= `INSERT INTO account (Email_Address,password) 
        VALUES ("${email}","${password}")`;

        dbConn.query(sqlQuery, function(error, results){
            res.status(200).json({
                success: true,
                msg: "Account Creation Successful!",
                userid: results.insertId,

            });
        
        });   
    } catch (error){
        console.log(error);
        return next(error);
    }

});

//LOGIN
router.get('/login',(req,res,next)=>{
    var email = req.body.email;
    var password = req.body.password;
    var userToken = '';
    try{
        sqlQuery = `SELECT User_id FROM account 
        WHERE Email_Address="${email}" AND password="${password}"`;

        dbConn.query(sqlQuery, function(error,results){
            userid = results.id;

            if (results.length > 0){

                userToken = jwt.sign({data: results}, 'secretkey',{
                    expiresIn: '1h', 
                });

                res.status(200).json({
                    msg: 'login successful',
                    userToken: userToken,
                });
            } else {
                res.status(200).json({
                    msg: 'Invalid username/password',
                    userid: '',
                });            
            }            
        });       
    } catch (error){
        return next(error);
    }
})

module.exports = router;