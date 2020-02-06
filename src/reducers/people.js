import {
    GET_PEOPLE_PENDING,
    GET_PEOPLE_REJECTED,
    GET_PEOPLE_RESOLVED,
    GET_PAGE,
    GET_SIZE_PAGE,
    GET_AGE_MAX_MIN,
    GET_RESET_FILTER,
    GET_DELETE_PERSON,
    SET_PARAM_FILTER, ADD_NOT_SHOW_PERSON,
} from "../constants";

const INITIAL_DATA = {
    isLoading: false,
    ageMinDefault: 0,
    ageMaxDefault: 100,
    ageMin: 0,
    ageMax: 100,
    ageMinFilter: -1,
    ageMaxFilter: 1000,
    name: "",
    genderChoose: "both",
    people: [],
    notShow: [],
    page: 1,
    totalForPages: 1,
    pageSize: 20,
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
                totalForPages: action.payLoad.length,
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
                page: action.payLoad.currentPage,
                totalForPages: action.payLoad.pageCount,
            };
        }
        case GET_SIZE_PAGE: {
            return {
                ...state,
                pageSize: action.payLoad,
            };
        }
        case GET_DELETE_PERSON: {
            state.people[action.payLoad].show = false;
            return {
                ...state,
                people: state.people.filter(item => {
                    return item.show === undefined
                }),
            };
        }
        case ADD_NOT_SHOW_PERSON: {
            state.notShow.push(action.payLoad);
            return {
                ...state,
                notShow: state.notShow,
            };
        }
        case GET_RESET_FILTER: {
            return {
                ...state,
                ageMin: state.ageMinDefault,
                ageMax: state.ageMaxDefault,
                ageMinFilter: -1,
                ageMaxFilter: 1000,
                name: "",
                genderChoose: "both",
            };
        }
        case GET_AGE_MAX_MIN: {
            return {
                ...state,
                ageMinDefault: action.payLoad.min,
                ageMaxDefault: action.payLoad.max,
                ageMin: action.payLoad.min,
                ageMax: action.payLoad.max,
            };
        }
        case SET_PARAM_FILTER: {
            const {name, ageMin, ageMax, genderChoose} = action.payLoad;
            return {
                ...state,
                ageMinFilter: ageMin,
                ageMaxFilter: ageMax,
                genderChoose: genderChoose,
                name: name,
            };
        }
        default: {
            return state;
        }
    }
};