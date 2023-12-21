import {combineReducers} from "redux";
import themeReducer from "./themeReducer";

const combinedReducer = combineReducers({
    theme: themeReducer
})

export default combinedReducer