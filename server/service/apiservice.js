const ApiModel = require('../model/ApiModel');
const JsonUtils = require('../utils/JsonUtils');

// SELECT
async function select() {
	let {Items} = await ApiModel.selectItem();
	// 배열형식의 객체 -> 배열로 변환하기(하나씩 반복)
	const convertArray = Items.map((_item) => {
		_item.todos = JsonUtils.ObjectToArray(_item.todos);
		return _item;
	});
	return convertArray;
}

// SELECT ONE
async function selectOne(key) {
	let {Item} = await ApiModel.selectOneItem(key);
	// 배열형식의 객체 -> 배열로 변환하기
	Item.todos = JsonUtils.ObjectToArray(Item.todos);
	return Item;
}

// SELECT ONE
async function insert() {
	let data = await ApiModel.insertItem();
	return data.Item;
}

// SELECT UPDATE
async function update(params, reqData) {
	let data = await ApiModel.updateItem(params, reqData);
	return data;
}

// 서비스 전용 업데이트 여기서 DB적용 시킬 예정
// function update(params, reqData, data, testSetDataUpdate) {
	
// 	const result = data.map((_listitem) => {
// 		if (_listitem.keyid === Number(params.id)) {
			// switch(reqData.type) {
			// 	case 'D':
			// 		return {
			// 			..._listitem,
			// 			todos : _listitem.todos.filter((_item) => reqData.data.id !== _item.id)
			// 		};	
			// 	case 'T':
			// 		return {
			// 			..._listitem,
			// 			todos : _listitem.todos.map((_item) => (
			// 				reqData.data.id === _item.id ? {..._item, done : !_item.done} : _item 
			// 			))
			// 		};
			// 	case 'C':
			// 		return {
			// 			..._listitem,
			// 			todos : _listitem.todos.concat(reqData.data.todo)
			// 		};
			// 	default:
			// 		return _listitem;
			// }
// 
// 		} 
// 		else
// 			return _listitem;
// 	});
// 	testSetDataUpdate(result);
	
// }

exports.select = select;
exports.selectOne = selectOne;
exports.insert = insert;
exports.update = update;