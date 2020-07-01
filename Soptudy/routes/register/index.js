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

//스터디장이 스터디 등록
router.post('/', function (req, res, next) {
    const {
        study_name,
        study_img,
        category,
        capacity,
        op_sdate,
        op_edate,
        rc_sdate,
        rc_edate,
        goal,
        curriculum,
        deposit,
        reg_name,
        reg_number,
        status,
        password
    } = req.body

    var sql = `INSERT INTO study (study_name, study_img, category, capacity, op_sdate, op_edate, rc_sdate,rc_edate,  goal, curriculum, deposit, reg_name, reg_number, status, password) 
    VALUES ("${study_name}","${study_img}",${category},${capacity},"${op_sdate}","${op_edate}","${rc_sdate}","${rc_edate}","${goal}","${curriculum}",${deposit},"${reg_name}","${reg_number}",${status},"${password}");`
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                data: "완료"
            });
        }
    });
})



module.exports = router;