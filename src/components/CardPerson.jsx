import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../style/index.css';
import {Modal} from "./Modal";
import {ModalPositive} from "./ModalPositive";
import Icon from "antd/es/icon";

export const CardPerson = ({firstNamePerson, lastNamePerson, idPerson, agePerson, genderPerson, findForDeletePerson}) => {

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
        findForDeletePerson(id);
        toggleShowSecond(!showSecond);
    };
    const classNameIsActive = genderPerson ? "card-person" : "card-person is-inactive";
    return (
        <div>
            {show && <Modal idForShow={idPerson} handleShowNext={modalMessageAll} handleShowToggle={modalMessage}/>}
            {showSecond && <ModalPositive idForShow={idPerson} handleShowToggle={modalMessageOK}/>}
            <div className={classNameIsActive} onClick={modalMessage}>
                <div>
                    {genderPerson === "male" ? <Icon type="man"/> : <Icon type="woman"/>}
                    name - {firstNamePerson} {lastNamePerson},
                    age - {(new Date(Date.now())).getFullYear() - new Date(agePerson).getFullYear()},
                </div>
            </div>

        </div>
    )
};

