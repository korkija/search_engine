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
    SET_PARAM_FILTER, ADD_NOT_SHOW_PERSON,
} from "../constants";

const INITIAL_DATA = {
    isLoading: false,
    ageMinDefault:0,
    ageMaxDefault:100,
    ageMin:0,
    ageMax:100,
    ageMinFilter:0,
    ageMaxFilter:100,
    name:"",
    genderChoose:"both",
    people: [],
    peopleFilter: [],
    notShow: [],
    page:1,
    totalForPages:1,
    pageSize:20,
};

export const people = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case GET_PEOPLE_PENDING: {
            console.log("---GET_PEOPLE_PENDING------state "+state.genderChoose);
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
        case ADD_NOT_SHOW_PERSON: {
            state.notShow.push(action.payLoad);
            console.log(state.notShow);
            return {
                ...state,
                notShow: state.notShow,
            };
        }
        case GET_RESET_FILTER: {
            console.log("reset filter");
            return {
                ...state,
                ageMin: state.ageMinDefault,
                ageMax: state.ageMaxDefault,
                peopleFilter: state.people,
                name:"",
                genderChoose:"both",
                //totalForPages:state.people.length,
            };
        }
        case GET_AGE_MAX_MIN: {
            console.log("----GET_AGE_MAX_MIN-------state "+state.genderChoose);
            return {
                ...state,
                ageMinDefault:action.payLoad[0],
                ageMaxDefault:action.payLoad[1],
                ageMin:action.payLoad[0],
                ageMax:action.payLoad[1],

            };
        }
        case GET_FILTER_LIST: {
            return {
                ...state,
                peopleFilter:action.payLoad,
            };
        }
        case SET_PARAM_FILTER: {
            console.log("action.payLoad");
            console.log(action.payLoad);
            return {
                ...state,
                ageMinFilter:action.payLoad.ageMin,
                ageMaxFilter:action.payLoad.ageMax,
                nameSearch:action.payLoad.nameSearch,
                genderChoose:action.payLoad.genderChoose,
                name:action.payLoad.name,
            };
        }
        default: {
            return state;
        }
    }
};