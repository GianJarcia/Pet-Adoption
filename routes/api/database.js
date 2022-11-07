const e = require('express');
const express=require('express');

const router = express.Router();

var dbConn = require('../../config/db');

//routes
router.post('/add',(req,res)=>{
    console.log(req.body);

    var mediapicture = req.body.mediapicture;
    var mediavideo = req.body.mediavideo;
 

    sqlQuery = `INSERT INTO database_tb(media_picture, media_video) VALUES("${mediapicture}","${mediavideo}")`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
       
});

//select
router.get('/view', (req,res)=>{
    sqlQuery = `SELECT * FROM database_tb`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
});

//Update
router.patch('/update/:media_ID', (req,res)=>{
    console.log('API CONNECTION COMPLETE');
    const media_ID = req.params.media_ID;
    dbConn.query(`SELECT media_ID FROM database_tb WHERE media_ID = ${media_ID}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            var mediapicture = req.body.mediapicture;
            var mediavideo = req.body.mediavideo;

            dbConn.query(`UPDATE database_tb SET media_picture = "${mediapicture}", media_video = "${mediavideo}" WHERE media_ID = ${media_ID}`, function(error, results, fields){
                console.log("DATA HAS BEEN UPDATED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

//delete
router.delete('/delete/:media_ID', (req,res)=>{
    console.log('API RUNNING!!!');
    const media_ID = req.params.media_ID;
    dbConn.query(`SELECT media_ID FROM database_tb WHERE media_ID = ${media_ID}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            dbConn.query(`DELETE FROM database_tb WHERE media_ID = ${media_ID}`, function(error, results, fields){
                console.log("DATA DELETED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;