import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS } from '../../../utils/constants'
import { api } from '../../../utils/api'

interface initialStateProps {
    skills: any,
    getSkillsStatus: string
}

const initialState: initialStateProps = {
    skills: [],
    getSkillsStatus: STATUS.NOT_STARTED
  
}

export const getSkillsAction = createAsyncThunk(
    'skills/get',
    async (payload:any, thunkAPI) => {
        const response = await api.get('/skills', payload)
        const { ok, data } = response
        if(ok) {
            return data
        } else {
            return thunkAPI.rejectWithValue({response, data})
        }
    }
)

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    resetGetSkillsStatus: (state, payload) => {
        if(payload.payload) {
            state.getSkillsStatus = payload.payload
        } else {
            state.getSkillsStatus = STATUS.NOT_STARTED
        }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSkillsAction.pending, (state, action) => {
        state.getSkillsStatus = STATUS.PENDING 
    })
    builder.addCase(getSkillsAction.fulfilled, (state, action) => {
        state.skills = action.payload
        state.getSkillsStatus = STATUS.COMPLETED  
    })
    builder.addCase(getSkillsAction.rejected, (state, action) => {
        state.getSkillsStatus = STATUS.FAILED 
    })
  }
})

export const { resetGetSkillsStatus } = skillsSlice.actions

export default skillsSlice.reducer