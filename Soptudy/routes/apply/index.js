var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'db2019',
    database: 'soptudy',
    multipleStatements: true
});
conn.connect()


//클릭한 study 정보 보여주는 페이지 
router.get('/:study_id', function (req, res, next) {
    const study_id = req.params.study_id
    console.log(study_id)

    var sql = `SELECT * FROM study WHERE study_id=${study_id};` + `SELECT * FROM apply WHERE study_id=${study_id};`
    conn.query(sql, function (err, results, fields) {
        if (err) {
            console.log(err)
        } else {
            var study_data = results[0]
            var apply_data = results[1]

            res.status(200).json({
                study_data: study_data,
                apply_data: apply_data
            })
        }
    });

})


//스터디원이 스터디 신청 버튼 눌렀을 때 
router.post('/submit/:study_id', function (req, res, next) {
    const study_id = req.params.study_id
    const{
        apply_name,
        apply_part,
        apply_bound,
        apply_number
    }=req.body

    var sql = `INSERT INTO apply(apply_name, apply_part, apply_bound, apply_number, study_id) VALUES("${apply_name}",${apply_part},${apply_bound},"${apply_number}",${study_id});`

    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json({
                data:rows
            })
        }
    })
})



//비밀번호 입력후 study 수정버튼 눌렀을때 
router.post("/edit", (req, res, next) => {
    const {
        study_id,
        password
    } = req.body

    var sql = `SELECT * FROM study WHERE study_id=${study_id};`
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows[0].password)
            data = rows

            if (result.password == password) {
                //res.render("success", {
                //    data: result
                //})
                res.status(200).json({
                    data: data
                })
            } else {
                //res.render("fail")
                res.status(200).json({
                    data: "비밀번호가 틀리네요."
                })
            }
        }
    });
})

//study를 수정할 수 있는 페이지에서 수정완료(submit) 버튼을 눌렀을 때
router.post("/editform", (req, res, next) => {
    const {
        study_id,
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

    var sql = `UPDATE study SET study_name = "${study_name}", 
    study_img = "${study_img}", 
    category = ${category},
    capacity = ${capacity},
    op_sdate = "${op_sdate}",
    op_edate = "${op_edate}",
    rc_sdate = "${rc_sdate}",
    rc_edate = "${rc_edate}",
    goal = "${goal}",
    curriculum = "${curriculum}",
    deposit = ${deposit},
    reg_name = "${reg_name}",
    reg_number = "${reg_number}",
    status = ${status},
    password = "${password}"
    WHERE study_id = ${study_id};`

    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err)
        } else {
            //res.render("index")
            res.status(200).json({
                data: "업데이트 완료"
            })
        }
    });
})

module.exports = router;