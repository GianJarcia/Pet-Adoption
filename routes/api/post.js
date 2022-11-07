const e = require('express');
const express=require('express');

const router = express.Router();

var dbConn = require('../../config/db');

//routes
router.post('/add',(req,res)=>{
    console.log(req.body);

    var postcontent = req.body.postcontent;
    var posttype = req.body.posttype;
    var postdate = req.body.postdate;
    var poststatus = req.body.poststatus;

    sqlQuery = `INSERT INTO post(Post_content, Post_type, Post_date, Post_status) VALUES("${postcontent}","${posttype}","${postdate}","${poststatus}")`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
       
});

//select
router.get('/view', (req,res)=>{
    sqlQuery = `SELECT * FROM post`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
        res.status(200).json(results)
    });
});

//Update
router.patch('/update/:id', (req,res)=>{
    console.log('API CONNECTION COMPLETE');
    const id = req.params.id;
    dbConn.query(`SELECT id FROM post WHERE id = ${id}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            var postcontent = req.body.postcontent;
            var posttype = req.body.posttype;
            var postdate = req.body.postdate;
            var poststatus = req.body.poststatus;

            dbConn.query(`UPDATE post SET Post_content = "${postcontent}", Post_type = "${posttype}", Post_date = "${postdate}", Post_status = "${poststatus}" WHERE id = ${id}`, function(error, results, fields){
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
    dbConn.query(`SELECT id FROM post WHERE id = ${id}`, function(error, results, fields){
        if(error)throw error;

        else if(!results.length){
            console.log("ID DOES NOT EXIST")
            res.status(300).json("ID DOES NOT EXIST");
            return;
        }
        else{
            dbConn.query(`DELETE FROM post WHERE id = ${id}`, function(error, results, fields){
                console.log("DATA DELETED");
                if(error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;