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
    GET_DELETE_PERSON,
} from "../constants";

const getPeoplePending = () => ({type: GET_PEOPLE_PENDING});

const getPeopleResolved = (payLoad) => ({
    type: GET_PEOPLE_RESOLVED,
    payLoad
});

const getPeopleRejected = () => ({
    type: GET_PEOPLE_REJECTED,
    payLoad: "Something wrong!"
});

export const getChangeSizePage = (payLoad, payLoadSize) => {
    return (dispatch) => {
        let {people} = store.getState();
        dispatch(getSizePage(payLoadSize));
        dispatch(getPage(Math.ceil(people.pageSize * payLoad / payLoadSize)));
    }
};
export const getSizePage = (payLoad, payLoadSize) => ({
    type: GET_SIZE_PAGE,
    payLoad,
    payLoadSize,
});

const getDelete = (payLoad) => {
    return {
        type: GET_DELETE_PERSON,
        payLoad,
    }
};
export const getDeletePerson = (payLoad) => {
    let {people} = store.getState();
    const indexPeople = people.people.findIndex((item) => (item.id === payLoad));
    const indexFilterPeople = people.peopleFilter.findIndex((item) => (item.id === payLoad));
    return getDelete([indexPeople, indexFilterPeople]);
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

function sortOnName(people) {
    console.log(people);
    return people.sort(function (a, b) {
        //console.log("a- "+ a.first_name + " b- "+ b.first_name);
        //console.log(a.first_name > b.first_name);
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
    const dateNow= (new Date(Date.now())).getFullYear();
    let min = dateNow - new Date(arr[0].dob).getFullYear();
    let max = dateNow - new Date(arr[0].dob).getFullYear();
    for (let i = 1, len = arr.length; i < len; i++) {
        min = (dateNow-new Date(arr[i].dob).getFullYear() < min) ? dateNow-new Date(arr[i].dob).getFullYear() : min;
        max = (dateNow-new Date(arr[i].dob).getFullYear() > max) ? dateNow-new Date(arr[i].dob).getFullYear() : max;
    }
    return [min, max];
};


export const getFilter = ({name, ageMin, ageMax, genderChoose}) => {
    const dateMin = (new Date(Date.now())).getFullYear()-(ageMin);
    const dateMax = (new Date(Date.now())).getFullYear()-(ageMax);
    let {people} = store.getState();
    const filterList = people.people.filter(item => {
        if (item.show === undefined) {
            if (genderChoose === "both") {
                return ((new Date(item.dob)).getFullYear() <= dateMin)
                    && ((new Date(item.dob)).getFullYear() >= dateMax)
                    && (item.first_name.toLowerCase().indexOf(name.toLowerCase()) > -1)
            } else {
                return (item.gender === genderChoose)
                    && ((new Date(item.dob)).getFullYear() <= dateMin)
                    && ((new Date(item.dob)).getFullYear() >= dateMax)
                    && (item.first_name.toLowerCase().indexOf(name.toLowerCase()) > -1)
            }
        } else {
            return false;
        }
    });
    //getFilterList(filterList);
    return (dispatch) => {
        dispatch(getFilterList(filterList));
    };
};

export const getPeople = (page) => {
    return (dispatch) => {
        dispatch(getPeoplePending());
        const urlPage=URL_PEOPLE+page+URL_PEOPLE_PARAMS;
        console.log("urlPage");
        console.log(urlPage);
        axios.get(urlPage)
            .then(({data}) => {
                dispatch(getAgeMaxMin(findMinMax(data.result)));
                dispatch(getPeopleResolved(sortOnName(data.result)));
                console.log(data._meta);
                dispatch(getPage([data._meta.currentPage,data._meta.pageCount]));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getPeopleRejected());
            })
    };
};


