const e = require('express');
const express=require('express');

const router = express.Router();

var dbConn = require('../../config/db');

//routes
router.post('/add',(req,res)=>{
    console.log(req.body);

    var liketime = req.body.liketime;


    sqlQuery = `INSERT INTO like_tb(Like_time) VALUES("${liketime}")`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
       
});

//select
router.get('/view', (req,res)=>{
    sqlQuery = `SELECT * FROM like_tb`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
});

//Update
router.patch('/update/:Post_like_ID', (req,res)=>{
    console.log('API CONNECTION COMPLETE');
    const Post_like_ID = req.params.Post_like_ID;
    dbConn.query(`SELECT Post_like_ID FROM like_tb WHERE Post_like_ID = ${Post_like_ID}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            var liketime = req.body.liketime;

            dbConn.query(`UPDATE like_tb SET Like_time = "${liketime}" WHERE Post_like_ID = ${Post_like_ID}`, function(error, results, fields){
                console.log("DATA HAS BEEN UPDATED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

//delete
router.delete('/delete/:Post_like_ID', (req,res)=>{
    console.log('API RUNNING!!!');
    const Post_like_ID = req.params.Post_like_ID;
    dbConn.query(`SELECT Post_like_ID FROM like_tb WHERE Post_like_ID = ${Post_like_ID}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            dbConn.query(`DELETE FROM like_tb WHERE Post_like_ID = ${Post_like_ID}`, function(error, results, fields){
                console.log("DATA DELETED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;