import {configureStore} from "@reduxjs/toolkit"
import taskReducer from "./countSlice"

export const store = configureStore({
    reducer : {
        task : taskReducer,
    }
})