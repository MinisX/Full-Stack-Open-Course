import axios from 'axios'
const baseUrl = '/api/blogs'

let config = null

const setToken = newToken => {
  config = {
    headers: { Authorization: `Bearer ${newToken}` },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject, objectID) => {
  const response = await axios.put(`${baseUrl}/${objectID}`, updatedObject, config)
  return response.data
}

const remove = async (objectID) => {
  const response = await axios.delete(`${baseUrl}/${objectID}`, config)
  return response.data
}

const getComments = async (objectID) => {
  const response = await axios.get(`${baseUrl}/${objectID}/comments`, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }