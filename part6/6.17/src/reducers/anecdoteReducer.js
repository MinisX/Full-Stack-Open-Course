import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], 
  reducers: {
    createAnecdote(state, action){
      const content = action.payload
      // here we can "change the original state", since in reality it is not changed. Redux Toolkit utilizes Immer library for this.
      state.push({
        content,
        votes: 0,
        id: getId(),
      })
    },

    doVote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)

    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, doVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer