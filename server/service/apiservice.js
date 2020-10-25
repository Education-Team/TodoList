// 서비스 전용 업데이트 여기서 DB적용 시킬 예정
function update(params, reqData, data, testSetDataUpdate) {

	const result = data.map((_listitem) => {
		if (_listitem.keyid === Number(params.id)) {
			switch(reqData.type) {
				case 'D':
					return {
						..._listitem,
						todos : _listitem.todos.filter((_item) => reqData.data.id !== _item.id)
					};	
				case 'T':
					return {
						..._listitem,
						todos : _listitem.todos.map((_item) => (
							reqData.data.id === _item.id ? {..._item, done : !_item.done} : _item 
						))
					};
				case 'C':
					return {
						..._listitem,
						todos : _listitem.todos.concat(reqData.data.todo)
					};
				default:
					return _listitem;
			}

		} 
		else
			return _listitem;
	});
	testSetDataUpdate(result);
	
}

exports.update = update;