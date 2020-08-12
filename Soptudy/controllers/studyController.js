

const study = {
    //전체-0, 분야별-1,2,3,4,5 스터디 조회
    home: async (req, res) => {
        // 파라미터로 받은 todoId를 변수에 담는다. (localhost:3000/todolist/5e6e4743ea803ad69a8f82b8) 
        const todoId = req.params.todoId;
        // Todo(models/todolist.js) 모듈의 find()함수에 todoId를 인자로 넣어 실행한다.
        const todo = await studyModel.find(todoId);
        try {
            // 만약, 결과값이 존재하지 않는다면 존재하지 않는 글을 보려 시도한 것.
            if (!todo.length) 
                return res.status(404).send({ err: 'Todo not found' });
            // 존재한다면 find successfully와 함께 성공한 객체 출력
            res.send(`find successfully: ${todo}`);
        } catch (err) {
            // 서버 오류 발생시 500 status 반환
            res.status(500).send(err)
        }
    },


    // todo 모듈 중 read 비동기 함수

    // register: 스터디 등록

    // getApply: 특정 스터디 정보 조회  (파람필요)

    // postApply: 특정 스터디 신청 (파람필요)

    // getEdit: 특정 스터디 정보 조회(비밀번호 포함) (파람 필요)

    // putEdit: 특정 스터디 정보 수정 (파람 필요)

    // passwd: 특정스터디 비밀번호 확인 (파람필요)

}