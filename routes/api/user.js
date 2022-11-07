const e = require('express');
const express=require('express');
const jwt=require('jsonwebtoken');

const router = express.Router();

var dbConn = require('../../config/db');

//routes
router.post('/add',(req,res)=>{
    console.log(req.body);

    var username = req.body.username;
    var age = req.body.age;
    var gender = req.body.gender;
    var phonenumber = req.body.phonenumber;
    var petlike = req.body.petlike;

    sqlQuery = `INSERT INTO user(Username, Age, Gender, Phone_number, Pet_like) VALUES("${username}","${age}","${gender}","${phonenumber}","${petlike}")`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
       
});

//select
router.get('/view', (req,res)=>{

    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        res.status(200).json({
            success: false,
            msg: "Error, token not found",
        });
    }


    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken);

    sqlQuery = `SELECT * FROM user`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
});

//Update
router.patch('/update/:id', (req,res)=>{
    console.log('API CONNECTION COMPLETE');
    const id = req.params.id;
    dbConn.query(`SELECT id FROM user WHERE id = ${id}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            var username = req.body.username;
            var age = req.body.age;
            var gender = req.body.gender;
            var phonenumber = req.body.phonenumber;
            var petlike = req.body.petlike;

            dbConn.query(`UPDATE user SET username = "${username}", Age = ${age}, Gender = "${gender}", Phone_number = ${phonenumber}, Pet_like = "${petlike}" WHERE id = ${id}`, function(error, results, fields){
                console.log("DATA HAS BEEN UPDATED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

//delete
router.delete('/delete/:id', (req,res)=>{
    console.log('API RUNNING!!!');
    const id = req.params.id;
    dbConn.query(`SELECT id FROM user WHERE id = ${id}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            dbConn.query(`DELETE FROM user WHERE id = ${id}`, function(error, results, fields){
                console.log("DATA DELETED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;