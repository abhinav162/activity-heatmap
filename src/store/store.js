import combinedReducer from "./reducers/reducer";
import { createStore } from "redux";

const store = createStore(combinedReducer);

export default store;