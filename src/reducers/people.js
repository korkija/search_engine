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
    pageSize:20,
};

export const people = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case GET_PEOPLE_PENDING: {
            return {
                ...state,
                isLoading: true,
                errorMsg: ""
            };
        }
        case GET_PEOPLE_RESOLVED: {
            return {
                ...state,
                isLoading: false,
                people: action.payLoad,
                peopleFilter: [...action.payLoad],
                totalForPages:action.payLoad.length,
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
                page: action.payLoad[0],
                totalForPages:action.payLoad[1],
            };
        }
        case GET_SIZE_PAGE: {
            console.log(action.payLoad);
            return {
                ...state,
                pageSize: action.payLoad,
            };
        }
        case GET_DELETE_PERSON: {
            state.people[action.payLoad[0]].show=false;
            state.peopleFilter[action.payLoad[1]].show=false;
            return {
                ...state,
                people:state.people.filter(item => {return item.show === undefined}),
                peopleFilter:state.peopleFilter.filter(item => {return item.show === undefined}),
            };
        }
        case GET_RESET_FILTER: {
            return {
                ...state,
                ageMin: state.ageMinDefault,
                ageMax: state.ageMaxDefault,
                peopleFilter: state.people,
                //totalForPages:state.people.length,
            };
        }
        case GET_AGE_MAX_MIN: {
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
            return {
                ...state,
                peopleFilter:action.payLoad,
            };
        }
        default: {
            return state;
        }
    }
};