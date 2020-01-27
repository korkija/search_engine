import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../style/index.css';
import {Modal} from "./Modal";
import {ModalPositive} from "./ModalPositive";

export const CardPerson = ({namePerson, index, idPerson, agePerson, genderPerson, deletePerson}) => {

    const [show, toggleShow] = useState(false);
    const [showSecond, toggleShowSecond] = useState(false);
    const modalMessage = () => {
        toggleShow(!show);
    };
    const modalMessageAll = () => {
        toggleShow(!show);
        toggleShowSecond(!showSecond);
    };
    const modalMessageOK = (id) => {
        deletePerson(id);
        toggleShowSecond(!showSecond);
    };
    const classNameIsActive = genderPerson ? "card-person" : "card-person is-inactive";
    return (
        <div>
            {show && <Modal idForShow={idPerson} handleShowNext={modalMessageAll} handleShowToggle={modalMessage}/>}
            {showSecond && <ModalPositive idForShow={idPerson}  handleShowToggle={modalMessageOK}/>}
            <div className={classNameIsActive} onClick={modalMessage}>
                <div>№{index} name - {namePerson}, age - {agePerson}, gender - {String(genderPerson)} </div>
            </div>

        </div>
    )
};

