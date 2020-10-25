const express = require('express');
const router = express.Router();
const ApiService = require('../service/apiservice');

// 테스트 전용 상태 (디비 연동 하면 삭제 예정)
let testdata = [
	{
		keyid : 1,
		date: '2020-10-20',
		todos: [
			{
				id: 1,
				text: '투두리스트 만들기',
				done: false
			},
			{
				id: 2,
				text: '리액트 공부하기',
				done: true
			},
			{
				id: 3,
				text: 'REST API 구축하기',
				done: true
			},
		]
	},
	{
		keyid : 2,
		date: '2020-10-21',
		todos: [
			{
				id: 4,
				text: '투두리스트 메인페이지 만들기',
				done: true
			},
			{
				id: 5,
				text: 'Express 서버 공부하기',
				done: false
			},
			{
				id: 6,
				text: 'Dynamodb 공부하기',
				done: false
			},
		]
	},
	{
		keyid : 3,
		date: '2020-10-18',
		todos: [
			{
				id: 7,
				text: '테스트7',
				done: false
			}
		]
	},
	{
		keyid : 4,
		date: '2020-10-17',
		todos: [
			{
				id: 8,
				text: '테스트8',
				done: false
			}
		]
	}
];

// 테스트 전용 상태 변경 관리 (디비 연동 하면 삭제 예정)
function testSetDataUpdate(_afterdata) {
	console.log("- 변경전 -");
	console.log(testdata);
	testdata = _afterdata;
	console.log("- 변경후 -");
	console.log(testdata);
}

// 테스트용
router.get('/', (req, res) => {
    console.log('http://localhost:3002/api/');
    res.send({ title: 'hello react!' });
});

// 전체 투두리스트 데이터 가져오기(DB 적용할 예정) - R
router.get('/todos', (req, res) => {
    console.log('GET http://localhost:3002/api/todos');
	res.json(testdata);
});

// 특정 투두리스트 데이터 가져오기(DB 적용할 예정) - R
router.get('/todos/:id', (req, res) => {
    console.log(`GET http://localhost:3002/api/todos/${req.params.id}`);
	const onedata = testdata.find(_item=>_item.keyid == req.params.id);
	res.json(onedata);
});

// 투두리스트 추가(DB 적용할 예정) - C
router.post('/todos', (req, res) => {
    console.log('POST http://localhost:3002/api/todos');
	console.log(req.body);
	res.json({result : "ok"});
});

// 투두리스트 수정(DB 적용할 예정) - U
router.put('/todos/:id', (req, res) => {
	console.log(`PUT http://localhost:3002/api/todos/${req.params.id}`);
	console.log(req.body);
	ApiService.update(req.params, req.body, testdata, testSetDataUpdate);		// api 업데이트 서비스
	res.json({result : "ok"});
});

// 투두리스트 삭제(DB 적용할 예정) - D
router.delete('/todos/:id', (req, res) => {
	console.log(`DELETE http://localhost:3002/api/todos/${req.params.id}`);
	res.json({result : "ok"});
});



module.exports = router;