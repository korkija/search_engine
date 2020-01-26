import thunk from "redux-thunk";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {people} from "./reducers/people";
// import {space} from "./reducers/space";

// Combine Reducers
const reducers = combineReducers({people});

export const store = createStore(reducers, applyMiddleware(thunk));
//export const store = createStore(movies, applyMiddleware(thunk));
// export const store = createStore(combineReducers({
//     movies: movies,
//     space: space}),
//     applyMiddleware(thunk));