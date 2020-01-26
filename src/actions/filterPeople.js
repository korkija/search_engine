import {
    GET_PEOPLE_FILTER_PENDING,
    GET_PEOPLE_FILTER_RESOLVED
} from "../constants";
import {store} from "../store";

const getFilterMoviesPending = () => ({type: GET_MOVIES_FILTER_PENDING});
const getFilterMoviesResolved = (payLoad) => ({
    type: GET_MOVIES_FILTER_RESOLVED,
    payLoad
});