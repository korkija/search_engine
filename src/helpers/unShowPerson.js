// export const unShowPersonOnList = (peopleList,notShow) => {
//     return peopleList.map(item => {
//             if (notShow.find(itemIn => item.id === itemIn)) {
//                 item.show = false;
//             }
//             return item;
//         }
//     )
// };
export const unShowPersonOnList = (peopleList,notShow) => {
    return peopleList.filter(item =>{
        return !notShow.find(itemIn => item.id === itemIn);
        }
           // !notShow.find(itemIn => item.id === itemIn);//?false: true;
    )
};