import axios from "axios";
import {sortByName} from "../helpers/SortByName";
import {findMinMax} from "../helpers/findMinMax";

import {
    GET_PEOPLE_PENDING,
    GET_PEOPLE_REJECTED,
    GET_PEOPLE_RESOLVED,
    URL_PEOPLE,
    URL_PEOPLE_PARAMS,
    GET_SIZE_PAGE,
    GET_PAGE,
    GET_AGE_MAX_MIN,
    GET_RESET_FILTER,
    GET_DELETE_PERSON, SET_PARAM_FILTER, ADD_NOT_SHOW_PERSON,
} from "../constants";

const getPeoplePending = () => ({
    type: GET_PEOPLE_PENDING
});

const getPeopleResolved = (payLoad) => ({
    type: GET_PEOPLE_RESOLVED,
    payLoad
});

const getPeopleRejected = () => ({
    type: GET_PEOPLE_REJECTED,
    payLoad: "Something wrong!"
});

export const getChangeSizePage = (payLoad, payLoadSize) => {
    return (dispatch, getState) => {
        let {people} = getState();
        dispatch(setSizePage(payLoadSize));
        dispatch(getPage(Math.ceil(people.pageSize * payLoad / payLoadSize)));
    }
};
export const setSizePage = (pageSize) => ({
    type: GET_SIZE_PAGE,
    payLoad: {
        pageSize
    }
});

const deletePerson = (ID) => ({
    type: GET_DELETE_PERSON,
    payLoad: ID,
});

const notShowPeople = (ID) => ({
    type: ADD_NOT_SHOW_PERSON,
    payLoad: ID,
});

export const findForDeletePerson = (ID) => {
    return (dispatch, getState) => {
        const {people} = getState();
        const indexPeople = people.people.findIndex((item) => (item.id === ID));
        dispatch(notShowPeople(ID));
        dispatch(deletePerson(indexPeople));
    };
};

export const resetFilter = () => ({
    type: GET_RESET_FILTER
});

export const getPage = (currentPage,pageCount) => ({
    type: GET_PAGE,
    payLoad: {
        currentPage,
        pageCount,
    }
});

const setAgeMaxMin = ({min, max}) => ({
    type: GET_AGE_MAX_MIN,
    payLoad: {
        min,
        max,
    }
});

export const setParamFilter = ({name, ageMin, ageMax, genderChoose}) => ({
    type: SET_PARAM_FILTER,
    payLoad: {
        name,
        ageMin,
        ageMax,
        genderChoose}
});

export const getPeople = (page) => {
    return (dispatch, getState) => {
        dispatch(getPeoplePending());
        const urlPage = URL_PEOPLE + page + URL_PEOPLE_PARAMS;
        axios.get(urlPage)
            .then(({data}) => {
                const {people} = getState();
                dispatch(setAgeMaxMin(findMinMax(data.result)));
                dispatch(getPeopleResolved(sortByName(data.result, people.notShow)));
                const {name, ageMinFilter: ageMin, ageMaxFilter: ageMax, genderChoose} = people;
                dispatch(setParamFilter({name, ageMin, ageMax, genderChoose}));
                dispatch(getPage(data._meta.currentPage, data._meta.pageCount));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getPeopleRejected());
            })
    };
};


