const e = require('express');
const express=require('express');

const router = express.Router();

var dbConn = require('../../config/db');

//routes
router.post('/add',(req,res)=>{
    console.log(req.body);

    var chatcontent = req.body.chatcontent;
    var chattime = req.body.chattime;
 

    sqlQuery = `INSERT INTO chat_tb(Chat_content, Chat_time) VALUES("${chatcontent}","${chattime}")`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
       
});

//select
router.get('/view', (req,res)=>{
    sqlQuery = `SELECT * FROM chat_tb`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
});

//Update
router.patch('/update/:Chat_ID', (req,res)=>{
    console.log('API CONNECTION COMPLETE');
    const Chat_ID = req.params.Chat_ID;
    dbConn.query(`SELECT Chat_ID FROM chat_tb WHERE Chat_ID = ${Chat_ID}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            var chatcontent = req.body.chatcontent;
            var chattime = req.body.chattime;

            dbConn.query(`UPDATE chat_tb SET Chat_content = "${chatcontent}", Chat_time = "${chattime}" WHERE Chat_ID = ${Chat_ID}`, function(error, results, fields){
                console.log("DATA HAS BEEN UPDATED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

//delete
router.delete('/delete/:Chat_ID', (req,res)=>{
    console.log('API RUNNING!!!');
    const Chat_ID = req.params.Chat_ID;
    dbConn.query(`SELECT Chat_ID FROM chat_tb WHERE Chat_ID = ${Chat_ID}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            dbConn.query(`DELETE FROM chat_tb WHERE Chat_ID = ${Chat_ID}`, function(error, results, fields){
                console.log("DATA DELETED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;