import { combineReducers } from "@reduxjs/toolkit";
import login from "./login";
import vacancies from "./vacancies";
import jobs from "./jobs"
import appLogin from "./appLogin";
import app from "./app"

let rootReducer = combineReducers({
    login,
    vacancies,
    jobs,
    appLogin,
    app
})

export default rootReducer