import { createSlice } from '@reduxjs/toolkit'

export interface initialStateProps {
    user: {},
}

const initialState: initialStateProps = {
  user: {}
}

export const appLoginSlice = createSlice({
  name: 'appLogin',
  initialState,
  reducers: {
    getUser: (state:any) => {
        let user = localStorage.getItem('user')
        if(user) {
            state.user = JSON.parse(user)
        } else {
            state.user = {}
        }
    },
  },
  extraReducers: (builder) => {}
})

export const { getUser } = appLoginSlice.actions

export default appLoginSlice.reducer