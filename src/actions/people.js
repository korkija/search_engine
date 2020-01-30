import axios from "axios";
import {store} from "../store";

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
    GET_FILTER_LIST,
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
        dispatch(getSizePage(payLoadSize));
        dispatch(getPage(Math.ceil(people.pageSize * payLoad / payLoadSize)));
    }
};
export const getSizePage = (prop1, prop2) => ({
    type: GET_SIZE_PAGE,
    payload: {
        prop1,
        prop2
    },    
});

const deletePersonByID = (ID) => {
    return {
        type: GET_DELETE_PERSON,
        payload: ID,
    }
};

const notShowPeople = (payLoad) => {
    return {
        type: ADD_NOT_SHOW_PERSON,
        payLoad,
    }
};

export const getDeletePerson = (payLoad) =>  (dispatch, getState) => {    
        const {people} = getState();
        
        const indexPeople = people.people.findIndex((item) => (item.id === payLoad));
        const indexFilterPeople = people.peopleFilter.findIndex((item) => (item.id === payLoad));
        
        dispatch(notShowPeople(payLoad));
        dispatch(getDelete([indexPeople, indexFilterPeople]));

};

const getFilterList = (payLoad) => {
    return {
        type: GET_FILTER_LIST,
        payLoad
    }
};

export const getResetFilter = () => {
    return (dispatch) => {
        dispatch({
            type: GET_RESET_FILTER
        })
    }
};

export const getPage = (payLoad) => ({
    type: GET_PAGE,
    payLoad
});

const unShowPersonOnList = (peopleList, notShow) => {  
    return peopleList.map(item => {
            //notShow.find(itemIn => item.id === itemIn);
            if (notShow.find(itemIn => item.id === itemIn)) {
                item.show = false;
            }
            return item;
        }
    )
};

function sortOnName(people) {
    console.log(people);    
    people = unShowPersonOnList(people);    
    console.log(people);
    
    return people.sort(function (a, b) {
        if (a.first_name[0] < b.first_name[0]) //сортируем строки по возрастанию
            return -1;
        if (a.first_name[0] > b.first_name[0])
            return 1;
        return 0;
    });
}

const getAgeMaxMin = (payLoad) => ({
    type: GET_AGE_MAX_MIN,
    payLoad
});

const findMinMax = (arr) => {
    const dateNow = (new Date(Date.now())).getFullYear();
    let min = dateNow - new Date(arr[0].dob).getFullYear();
    let max = dateNow - new Date(arr[0].dob).getFullYear();
    for (let i = 1, len = arr.length; i < len; i++) {
        min = (dateNow - new Date(arr[i].dob).getFullYear() < min) ? dateNow - new Date(arr[i].dob).getFullYear() : min;
        max = (dateNow - new Date(arr[i].dob).getFullYear() > max) ? dateNow - new Date(arr[i].dob).getFullYear() : max;
    }
    return [min, max];
};

const setParamFilter = (payLoad) => ({
    type: SET_PARAM_FILTER,
    payLoad
});

export const getFilter = ({name, ageMin, ageMax, genderChoose}) => {
    return (dispatch) => {    
    
    const dateMin = (new Date(Date.now())).getFullYear() - (ageMin);
    const dateMax = (new Date(Date.now())).getFullYear() - (ageMax);
    let {people} = store.getState();
    const filterList = people.people.filter(item => {
        if (item.show === undefined) {
            if (genderChoose === "both") {
                return ((new Date(item.dob)).getFullYear() <= dateMin)
                    && ((new Date(item.dob)).getFullYear() >= dateMax)
                    && ((item.first_name.toLowerCase().indexOf(name.toLowerCase()) > -1) || (item.last_name.toLowerCase().indexOf(name.toLowerCase()) > -1))
            } else {
                return (item.gender === genderChoose)
                    && ((new Date(item.dob)).getFullYear() <= dateMin)
                    && ((new Date(item.dob)).getFullYear() >= dateMax)
                    && ((item.first_name.toLowerCase().indexOf(name.toLowerCase()) > -1) || (item.last_name.toLowerCase().indexOf(name.toLowerCase()) > -1))
            }
        } else {
            return false;
        }
    });
    //people.notShow.filter(item=>)

        dispatch(getFilterList(filterList));
        dispatch(setParamFilter({name, ageMin, ageMax, genderChoose}));
    };
};

export const getPeople = (page) => {
    return (dispatch) => {
        dispatch(getPeoplePending());
        const urlPage = URL_PEOPLE + page + URL_PEOPLE_PARAMS;
        axios.get(urlPage)
            .then(({data}) => {
                dispatch(getAgeMaxMin(findMinMax(data.result)));
                dispatch(getPeopleResolved(sortOnName(data.result)));
                let {people} = store.getState();
                let {name, ageMinFilter: ageMin, ageMaxFilter: ageMax, genderChoose} = people;
                dispatch(getFilter({name, ageMin, ageMax, genderChoose}));
                dispatch(getPage([data._meta.currentPage, data._meta.pageCount]));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getPeopleRejected());
            })
    };
};


