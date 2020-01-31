export const setFilter = (name, ageMin, ageMax, genderChoose, people) => {
    const dateNow=(new Date(Date.now())).getFullYear();
    const dateMin = dateNow - (ageMin);
    const dateMax = dateNow - (ageMax);
    return people.filter(item => {
        if (item.show === undefined) {
            const itemYears = (new Date(item.dob)).getFullYear();
            if (genderChoose === "both") {
                return (itemYears <= dateMin)
                    && (itemYears >= dateMax)
                    && ((item.first_name.toLowerCase().indexOf(name.toLowerCase()) > -1) || (item.last_name.toLowerCase().indexOf(name.toLowerCase()) > -1))
            } else {
                return (item.gender === genderChoose)
                    && (itemYears <= dateMin)
                    && (itemYears >= dateMax)
                    && ((item.first_name.toLowerCase().indexOf(name.toLowerCase()) > -1) || (item.last_name.toLowerCase().indexOf(name.toLowerCase()) > -1))
            }
        } else {
            return false;
        }
    });
};