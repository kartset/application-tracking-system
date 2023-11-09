import { createSlice } from '@reduxjs/toolkit'
import { faker } from '@faker-js/faker';
import { jobProps } from '../../../routes/jobs/list';

export interface initialStateProps {
    jobsList: jobProps[],
    jobCategoriesArr: string[],
    jobsExperienceLevelArr: string[],
    jobDepartmentsArr: string[]
}

const initialState: initialStateProps = {
    jobsList: [],
    jobCategoriesArr: [],
    jobsExperienceLevelArr: ['Fresher', 'Associate', 'Senior', 'Executive', 'Advisory'],
    jobDepartmentsArr: []

}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    initialJobs: (state) => {
        let jobsArrayLocal = [1,2,3,4,5,6,7,8,9,10].map(i => {
            return {
                jobDescription: faker.lorem.lines(5),
                jobTitle: faker.person.jobTitle(),
                jobType: faker.person.jobType(),
                jobArea: faker.person.jobArea(),
                datePosted: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: (new Date()).toISOString()}),
                jobLocation: faker.location.city()
            }
        })
        state.jobsList = jobsArrayLocal.sort((d1, d2) => new Date(d1.datePosted).getTime() - new Date(d2.datePosted).getTime())
        state.jobCategoriesArr = [...new Set(jobsArrayLocal.map(job => {
            return job.jobType
        }))]
        state.jobDepartmentsArr = [...new Set(jobsArrayLocal.map(job => {
            return job.jobArea
        }))]
    }
  },
  extraReducers: (builder) => {}
})

export const { initialJobs } = jobsSlice.actions

export default jobsSlice.reducer