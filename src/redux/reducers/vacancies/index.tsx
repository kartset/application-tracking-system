import { faker } from '@faker-js/faker'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { jobExperienceLevels } from '../../../utils/constants'

const initialVacanciesList = Array.from({length: 5 }, (v, i) => i).map(i => {
    return {
        position: faker.person.jobTitle(),
        type: faker.person.jobType(),
        jobArea: faker.person.jobArea(),
        currentVacancies: faker.number.int({min:10, max:50}),
        public: true,
        // remote: true,
        // posted: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: (new Date()).toISOString()}).toString().split(' ').splice(1,3).join(' '),
        location: faker.location.city(),
        salary: '$ ' + String(faker.number.float({min:20, max:30}).toFixed(2)) +'k' + ' - ' + String(faker.number.float({min:40, max:50}).toFixed(2)) +'k',
        experience: String(faker.number.int({min:1, max:3})) + ' - ' + String(faker.number.int({min:4,max:7})),
        equity: '$ ' + String(faker.number.float({min:0, max:0.5}).toFixed(2)) + ' - ' + String(faker.number.float({min:0.5, max:1}).toFixed(2)),
        jobExperienceLevel: jobExperienceLevels[Math.floor(Math.random()*jobExperienceLevels.length)]

    }
})

export interface initialStateProps {
    HTML: string,
    json: any,
    initialVacanciesList:any,
    vacanciesList: any,
    vacanicesCategoriesArr: any,
    vacanciesDepartmentsArr: any

}

const initialState: initialStateProps = {
  HTML: JSON.stringify('<span></span>'),
  json: null,
  initialVacanciesList:initialVacanciesList,
  vacanciesList: [],
  vacanicesCategoriesArr: [],
  vacanciesDepartmentsArr: [],

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
    },
    initializeVacancies: (state) => {
        state.vacanciesList = state.initialVacanciesList.sort((d1:any, d2:any) => new Date(d1.datePosted).getTime() - new Date(d2.datePosted).getTime())
        state.vacanicesCategoriesArr = [...new Set(state.vacanciesList.map((vac:any) => {
            return vac.jobType
        }))]
        state.vacanciesDepartmentsArr = [...new Set(state.vacanciesList.map((vac:any) => {
            return vac.jobArea
        }))]
    }
  },
  extraReducers: (builder) => {}
})

export const { setHTML, setJSON, initializeVacancies } = vacanciesSlice.actions

export default vacanciesSlice.reducer