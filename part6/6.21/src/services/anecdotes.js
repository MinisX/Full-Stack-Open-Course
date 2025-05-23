import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseURL).then(res => res.data)
}

export const createAnecdote = newAnecdote =>
  axios.post(baseURL, newAnecdote).then(res => res.data)