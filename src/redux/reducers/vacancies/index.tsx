import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface initialStateProps {
    HTML: string,
    json: any
}

const initialState: initialStateProps = {
  HTML: JSON.stringify('<span></span>'),
  json: null
}

export const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setHTML: (state, payload:PayloadAction<any>) => {
        state.HTML = payload.payload
    },
    setJSON: (state, payload:PayloadAction<any>) => {
        state.json = payload.payload
    }
  },
  extraReducers: (builder) => {}
})

export const { setHTML, setJSON } = vacanciesSlice.actions

export default vacanciesSlice.reducer