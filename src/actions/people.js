import axios from "axios";
import {store} from "../store";

import {
    GET_PEOPLE_PENDING,
    GET_PEOPLE_REJECTED,
    GET_PEOPLE_RESOLVED,
    URL_PEOPLE,
    GET_SIZE_PAGE,
    GET_PAGE,
    GET_AGE_MAX_MIN,
    GET_RESET_FILTER,
    GET_FILTER_LIST,
    GET_DELETE_PERSON,
} from "../constants";
import {people} from "../reducers/people";

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
        console.log(people.pageSize);
        dispatch(getSizePage(payLoadSize));
        console.log(payLoadSize);
        console.log(Math.ceil(people.pageSize*payLoad/payLoadSize));
        dispatch(getPage(Math.ceil(people.pageSize*payLoad/payLoadSize)));
    }
};
export const getSizePage = (payLoad, payLoadSize) => ({
    type: GET_SIZE_PAGE,
    payLoad,
    payLoadSize,
});

const getDelete = (payLoad) => {
    console.log("dddddddddddddddd");
    return {
    type: GET_DELETE_PERSON,
    payLoad,
}};
export const getDeletePerson = (payLoad) => {
    let {people} = store.getState();
    const indexPeople=people.people.findIndex((item)=>(item._id===payLoad));
    const indexFilterPeople=people.peopleFilter.findIndex((item)=>(item._id===payLoad));
    getDelete([indexPeople,indexFilterPeople]);
};

const getFilterList = (payLoad) => {
    return {
        type: GET_FILTER_LIST,
        payLoad
    }
};

export const getResetFilter = () => {
    console.log("getResetFilter");
    return (dispatch) => {
        dispatch({
        type: GET_RESET_FILTER
    })}
};

export const getPage = (payLoad) => ({
    type: GET_PAGE,
    payLoad
});

function sortOnName(people) {
    return people.sort(function (a, b) {
        return a.row - b.row;
    });
}

const getAgeMaxMin = (payLoad) => ({
    type: GET_AGE_MAX_MIN,
    payLoad
});

const findMinMax = (arr) => {
    let min = arr[0].place, max = arr[0].place;
    for (let i = 1, len = arr.length; i < len; i++) {
        let v = arr[i].place;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
    }
    return [min, max];
};


export const getFilter = ({name, ageMin, ageMax, genderChoose}) => {
    let {people} = store.getState();
    const gender = true;//
    const filterList = people.people.filter(item => {
        if (genderChoose==="both") {
            return (item.place >= ageMin)
                && (item.place <= ageMax)
                && (item.room.toLowerCase().indexOf(name.toLowerCase()) > -1)
        } else
        {
            return (item.booked === gender)
                && (item.place >= ageMin)
                && (item.place <= ageMax)
                && (item.room.toLowerCase().indexOf(name.toLowerCase()) > -1)
        }
    });
    console.log(filterList);
    getFilterList(filterList);
    return (dispatch) => {
        dispatch(getFilterList(filterList));
    };
};

export const getPeople = () => {
    return (dispatch) => {
        dispatch(getPeoplePending());
        axios.get(URL_PEOPLE)
            .then(({data}) => {
                //console.log(data);
                dispatch(getAgeMaxMin(findMinMax(data.space)));
                dispatch(getPeopleResolved(sortOnName(data.space)));


            })
            .catch((error) => {
                console.log(error);
                dispatch(getPeopleRejected());
            })
    };
};


