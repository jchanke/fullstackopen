import { createSlice } from "@reduxjs/toolkit"

const DEFAULT_FILTER = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState: DEFAULT_FILTER,
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer