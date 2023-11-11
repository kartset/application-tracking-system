import { createSlice, current } from '@reduxjs/toolkit'
import { faker } from '@faker-js/faker';
import { jobProps } from '../../../routes/jobs/list';

export interface initialStateProps {
    jobsList: jobProps[],
    initialJobsList: jobProps[],
    jobCategoriesArr: string[],
    jobsExperienceLevelArr: string[],
    jobDepartmentsArr: string[],
    filters: filterProps,
}

export interface filterProps {
    location:string,
    jobTypes: string[],
    jobExperienceLevels: string[],
    jobDepartments: string[],
}

const initialFilter = {
    location:'',
    jobTypes: [],
    jobExperienceLevels: [],
    jobDepartments: [],
}

const jobExperienceLevels = ['Fresher', 'Associate', 'Senior', 'Executive', 'Advisory']

const initialJobsList = [1,2,3,4,5,6,7,8,9,10].map(i => {
    return {
        jobDescription: faker.lorem.lines(5),
        jobTitle: faker.person.jobTitle(),
        jobType: faker.person.jobType(),
        jobArea: faker.person.jobArea(),
        datePosted: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: (new Date()).toISOString()}).toString().split(' ').splice(1,3).join(' '),
        jobLocation: faker.location.city(),
        jobExperienceLevel: jobExperienceLevels[Math.floor(Math.random()*jobExperienceLevels.length)]

    }
})


const initialState: initialStateProps = {
    initialJobsList:initialJobsList,
    jobsList: initialJobsList,
    jobCategoriesArr: [],
    jobsExperienceLevelArr: ['Fresher', 'Associate', 'Senior', 'Executive', 'Advisory'],
    jobDepartmentsArr: [],
    filters: initialFilter

}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    
    initialJobs: (state) => {
        state.jobsList = state.initialJobsList.sort((d1, d2) => new Date(d1.datePosted).getTime() - new Date(d2.datePosted).getTime())
        state.jobCategoriesArr = [...new Set(state.jobsList.map(job => {
            return job.jobType
        }))]
        state.jobDepartmentsArr = [...new Set(state.jobsList.map(job => {
            return job.jobArea
        }))]
    },
    
    updateFilter: (state, payload) => {
        state.filters = {
            ...current(state.filters),
            ...payload.payload
        }
    },

    resetFilter:( state ) => {
        state.filters = initialFilter
        state.jobsList = state.initialJobsList.sort((d1, d2) => new Date(d1.datePosted).getTime() - new Date(d2.datePosted).getTime())
    },

    updateJobs: (state) => {
        state.jobsList = initialJobsList.filter(job => {
            if(job.jobLocation === current(state).filters['location']) {
                return job
            } else if(current(state).filters['jobTypes'].includes(job.jobType.toLowerCase())) {
                return job
            } else if(current(state).filters['jobExperienceLevels'].includes(job.jobExperienceLevel.toLowerCase())) {
                return job
            } else if (current(state).filters['jobDepartments'].includes(job.jobArea.toLowerCase())) {
                return job
            } else {
                
            }
        })
    },

    resetJobs: (state) => {
        state.jobsList = state.initialJobsList
    }

  },
  extraReducers: (builder) => {}
})

export const { resetJobs, initialJobs, updateFilter, resetFilter, updateJobs } = jobsSlice.actions

export default jobsSlice.reducer