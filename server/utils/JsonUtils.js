// 배열형식의 객체 -> 배열로 변환하기
function ObjectToArray(dataObject) {
	const result = Object.keys(dataObject).map(_key => dataObject[_key]);
	return result;
}

exports.ObjectToArray = ObjectToArray;