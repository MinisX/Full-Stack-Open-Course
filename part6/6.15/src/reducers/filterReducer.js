import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

// we can easily create reducer and related action creators using the createSlice
// to filterReduced and filterChange are not needed anymore
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer