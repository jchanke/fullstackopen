import axios from 'axios'

const SERVER_BASE_URL = '/api/persons'

const getAll = () => {
  return axios
    .get(SERVER_BASE_URL)
    .then(response => response.data)
}

const create = (newObject) => {
  return axios
    .post(SERVER_BASE_URL, newObject)
    .then(response => response.data)
}

const update = (id, newObject) => {
  return axios
    .put(`${SERVER_BASE_URL}/${id}`, newObject)
    .then(response => response.data)
}

const remove = (id) => {
  return axios
    .delete(`${SERVER_BASE_URL}/${id}`)
    .then(response => response.data)
}

export default { getAll, create, update, remove }