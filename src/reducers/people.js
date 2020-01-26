import {
    GET_PEOPLE_PENDING,
    GET_PEOPLE_REJECTED,
    GET_PEOPLE_RESOLVED,
    GET_PAGE,
    GET_SIZE_PAGE,
    GET_AGE_MAX_MIN,
    GET_RESET_FILTER,
    GET_FILTER_LIST,
    GET_DELETE_PERSON,
} from "../constants";

const INITIAL_DATA = {
    isLoading: false,
    ageMinDefault:0,
    ageMaxDefault:100,
    ageMin:0,
    ageMax:100,
    nameSearch:"",
    people: [],
    peopleFilter: [],
    page:1,
    totalForPages:1,
    pageSize:10,

};


export const people = (state = INITIAL_DATA, action) => {
    console.log("action.type");
    console.log(action.type);
    switch (action.type) {
        case GET_PEOPLE_PENDING: {
            return {
                ...state,
                isLoading: true,
                errorMsg: ""
            };
        }
        case GET_PEOPLE_RESOLVED: {
            console.log(action.payLoad.length);
            return {
                ...state,
                isLoading: false,
                people: action.payLoad,
                peopleFilter: action.payLoad,
                totalForPages:action.payLoad.length,
                // genres: genresToState(action.payLoad),
                // chooseMovie: chooseMovieFunc(action.payLoad)
            };
        }
        case GET_PEOPLE_REJECTED: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payLoad
            };
        }
        case GET_PAGE: {
            return {
                ...state,
                page: action.payLoad,
            };
        }
        case GET_SIZE_PAGE: {
            return {
                ...state,
                pageSize: action.payLoad,
            };
        }
        case GET_DELETE_PERSON: {
            console.log("GET_DELETE_PERSON");
            console.log(action.payLoad);
            return {
                ...state,
                people:state.people.splice(action.payLoad[0],1),
                peopleFilter:state.peopleFilter.splice(action.payLoad[1],1),
            };
        }
        case GET_RESET_FILTER: {
            console.log();
            return {
                ...state,
                ageMin: state.ageMinDefault,
                ageMax: state.ageMaxDefault,
                peopleFilter: state.people,
                totalForPages:state.people.length,
            };
        }
        case GET_AGE_MAX_MIN: {
           // console.log(action.payLoad[1]);
            return {
                ...state,
                ageMinDefault:action.payLoad[0],
                ageMaxDefault:action.payLoad[1],
                ageMin:action.payLoad[0],
                ageMax:action.payLoad[1],
                nameSearch:"",
            };
        }
        case GET_FILTER_LIST: {
            console.log("GET_FILTER_LIST");
            console.log(action.payLoad);
            return {
                ...state,
                peopleFilter:action.payLoad,
                totalForPages:action.payLoad.length,
            };
        }
        default: {
            return state;
        }
    }
};
