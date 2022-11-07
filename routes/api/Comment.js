const e = require('express');
const express=require('express');

const router = express.Router();

var dbConn = require('../../config/db');

//routes
router.post('/add',(req,res)=>{
    console.log(req.body);

    var commenttime = req.body.commenttext;
    var commenttext = req.body.commenttime;

    sqlQuery = `INSERT INTO comment(Comment_time, Comment_text) VALUES("${commenttime}","${commenttext}")`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
       
});

//select
router.get('/view', (req,res)=>{
    sqlQuery = `SELECT * FROM comment`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
});

//Update
router.patch('/update/:Comment_ID', (req,res)=>{
    console.log('API CONNECTION COMPLETE');
    const Comment_ID = req.params.Comment_ID;
    dbConn.query(`SELECT Comment_ID FROM comment WHERE Comment_ID = ${Comment_ID}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            var commenttime = req.body.commenttext;
            var commenttext = req.body.commenttime;

            dbConn.query(`UPDATE comment SET Comment_time = "${commenttime}", Comment_text = "${commenttext}" WHERE Comment_ID = ${Comment_ID}`, function(error, results, fields){
                console.log("DATA HAS BEEN UPDATED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

//delete
router.delete('/delete/:Comment_ID', (req,res)=>{
    console.log('API RUNNING!!!');
    const Comment_ID = req.params.Comment_ID;
    dbConn.query(`SELECT Comment_ID FROM comment WHERE Comment_ID = ${Comment_ID}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            dbConn.query(`DELETE FROM comment WHERE Comment_ID = ${Comment_ID}`, function(error, results, fields){
                console.log("DATA DELETED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;