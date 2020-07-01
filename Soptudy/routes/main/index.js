var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'db2019',
    database: 'soptudy'
});
conn.connect();
/* GET home page. */

// /main (필터링x)
router.get('/', function (req, res, next) {
    var sql = `SELECT * FROM study`;
    conn.query(sql, function (err, rows, fields) {
        if (err) {} else {
            const data = rows
            res.status(200).json({
                data: data
            })
        }
    });
    conn.end()
})


// /main/카테고리 (필터링o)
router.get('/:category', function (req, res, next) {
    const category = req.params.category
    console.log(category)
    var sql = `SELECT * FROM study WHERE category=${category}`;
    conn.query(sql, function (err, rows, fields) {
        if (err) {} else {
            const data = rows
            res.status(200).json({
                data: data
            })
        }
    });
})

module.exports = router;