export const findMinMax = (arr) => {
    const dateNow = (new Date(Date.now())).getFullYear();
    let min = dateNow - new Date(arr[0].dob).getFullYear();
    let max = dateNow - new Date(arr[0].dob).getFullYear();
    for (let i = 1, len = arr.length; i < len; i++) {
        min = (dateNow - new Date(arr[i].dob).getFullYear() < min) ? dateNow - new Date(arr[i].dob).getFullYear() : min;
        max = (dateNow - new Date(arr[i].dob).getFullYear() > max) ? dateNow - new Date(arr[i].dob).getFullYear() : max;
    }
    return {min, max};
};