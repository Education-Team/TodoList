import axios from 'axios';

const host = "https://gittodoproject-server.run.goorm.io"
// const host = "http://localhost:3002"

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

// 특정 투두 안 리스트 데이터 한개 추가
export async function createOneTodo(id, data = {}) {
	const response = await axios.put(`${host}/api/todos/${id}`, {
		type: 'C',
		data: { ...data }
	});
	return response.data;
}

// 특정 투두 안 리스트 데이터 한개 삭제(수정)
export async function deleteOneTodo(id, data = {}) {
	const response = await axios.put(`${host}/api/todos/${id}`, {
		type: 'D',
		data: { ...data }
	});
	return response.data;
}

// 특정 투두 안 리스트 데이터 토글 변경
export async function toggleOneTodo(id, data = {}) {
	const response = await axios.put(`${host}/api/todos/${id}`, {
		type: 'T',
		data: { ...data }
	});
	return response.data;
}