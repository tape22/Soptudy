const studyModel = require('../models/study');

const study = {
    readAll: async (req, res) => {
        const todos = await Todo.findAll();
        try {
            if (!todos.length)
                return res.status(404).send({
                    err: 'Todo not found'
                });
            res.send(`find successfully: ${todos}`);
        } catch (err) {
            res.status(500).send(err)
        }
    },

    // home : 전체-0, 분야별-1,2,3,4,5 스터디 조회

    // register: 스터디 등록
    register: async(req,res)=>{
        const { icon, title, category, headCount, startDate, endDate, intro, content, owner, password, status} = req.body;
        const result = await studyModel.addStudy({ icon, title, category, headCount, startDate, endDate, intro, content, owner, password, status})
        try {
            if (!todos.length)
                return res.status(404).send({
                    err: 'Todo not found'
                });
            res.send(`find successfully: ${todos}`);
        } catch (err) {
            res.status(500).send(err)
        }
    }

    // getApply: 특정 스터디 정보 조회  (파람필요)

    // postApply: 특정 스터디 신청 (파람필요)

    // getEdit: 특정 스터디 정보 조회(비밀번호 포함) (파람 필요)

    // putEdit: 특정 스터디 정보 수정 (파람 필요)

    // passwd: 특정스터디 비밀번호 확인 (파람필요)

}