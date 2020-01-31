export const unShowPersonOnList = (peopleList,notShow) => {
    return peopleList.map(item => {
            if (notShow.find(itemIn => item.id === itemIn)) {
                item.show = false;
            }
            return item;
        }
    )
};