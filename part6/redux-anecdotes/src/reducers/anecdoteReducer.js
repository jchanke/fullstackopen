import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteById(state, action) {
      const id = action.payload
      return state.map(anecdote =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    },

    appendAnecdote(state, action) {
      const newAnecdote = action.payload
      return [...state, newAnecdote]
    },

    setAnecdotes(_state, action) {
      const anecdotes = action.payload
      return anecdotes
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotesFromServer = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotesFromServer))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.update(anecdote.id, updatedAnecdote)
    dispatch(voteById(anecdote.id))
  }
}

export default anecdoteSlice.reducer
export const { voteById, appendAnecdote, setAnecdotes } = anecdoteSlice.actions