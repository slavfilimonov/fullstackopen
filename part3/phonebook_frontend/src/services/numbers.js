import axios from 'axios'
const baseUrl = '/api/people'
// const baseUrl = 'http://localhost:3001/people'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const update = (newObject, id) => {
	const url = `${baseUrl}/${id}`
	const request = axios.put(url, newObject)
	return request.then(response => response.data)
}

const deleteIt = id => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request
}

const phonebookService = {
	getAll,
	create,
	update,
	deleteIt
}

export default phonebookService