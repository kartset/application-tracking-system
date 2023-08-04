import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    profile: any,
    user: any,
}

const initialState: CounterState = {
  profile: {},
  user: {}
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, payload:PayloadAction<any>) => {
        state.user = payload.payload
    },
    setProfile: (state, payload:PayloadAction<any>) => {
        state.profile = payload.payload
    }
  },
  extraReducers: (builder) => {}
})

export const { setUser, setProfile } = loginSlice.actions

export default loginSlice.reducer