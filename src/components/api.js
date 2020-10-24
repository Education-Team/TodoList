import axios from 'axios';

const host = "https://gittodoproject-server.run.goorm.io"

// 전체 투두 리스트 데이터 불러오기
export async function getTodos() {
	const response = await axios.get(host + "/api/todos");
	return response.data;
}


// 특정 투투 데이터 불러오기
export async function getTodo(id) {
	const response = await axios.get(`${host}/api/todos/${id}`);
	return response.data;
}