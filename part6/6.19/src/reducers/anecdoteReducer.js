import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], 
  reducers: {
    appendAnecdote(state, action){
      state.push(action.payload)
    },

    doVote(state, action){
      const changedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, doVote, setAnecdotes } = anecdoteSlice.actions

// action creators with Redux Thunk 
// Redux Thunk is a middleware that allows action creators to return functions instead of plain objects. 
// This is useful for handling asynchronous operations, such as fetching data from an API or updating a database.
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// action creators with Redux Thunk 
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

// action creators with Redux Thunk 
export const updateVote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdoteToChange = state.anecdotes.find(n => n.id === id)

    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(changedAnecdote, anecdoteToChange.id)
    dispatch(doVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer