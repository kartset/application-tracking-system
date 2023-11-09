import { combineReducers } from "@reduxjs/toolkit";
import login from "./login/login";
import vacancies from "./vacancies";
import jobs from "./jobs"

let rootReducer = combineReducers({
    login,
    vacancies,
    jobs
})

export default rootReducer