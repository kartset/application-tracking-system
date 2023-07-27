import { combineReducers } from "@reduxjs/toolkit";
import login from "./login/login";

let rootReducer = combineReducers({
    login: login
})

export default rootReducer