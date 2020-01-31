import thunk from "redux-thunk";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {people} from "./reducers/people";
const reducers = combineReducers({people});

export const store = createStore(reducers, applyMiddleware(thunk));
