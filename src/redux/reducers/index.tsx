import { combineReducers } from "@reduxjs/toolkit";
import login from "./login/login";
import vacancies from "./vacancies";

let rootReducer = combineReducers({
    login,
    vacancies
})

export default rootReducer