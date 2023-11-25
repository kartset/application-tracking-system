import { createSlice } from '@reduxjs/toolkit'

export interface initialStateProps {
    sidebar: boolean
}


const initialState: initialStateProps = {
    sidebar: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSideBarState: (state) => {
        state.sidebar = !state.sidebar
    },
  },
  extraReducers: (builder) => {}
})

export const { setSideBarState } = appSlice.actions

export default appSlice.reducer