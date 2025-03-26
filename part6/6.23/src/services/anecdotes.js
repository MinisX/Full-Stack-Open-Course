import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseURL).then(res => res.data)
}

export const createAnecdote = newAnecdote =>
  axios.post(baseURL, newAnecdote).then(res => res.data)

export const updateAnecdote = async updatedAnecdote => {
  const response = await axios.put(`${baseURL}/${updatedAnecdote.id}`, updatedAnecdote)
  return response.data
}