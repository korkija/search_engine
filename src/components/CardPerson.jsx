import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../style/index.css';
import {connect} from "react-redux";
import {Pagination} from "antd";
import {Modal} from "./Modal";
import {ModalPositive} from "./ModalPositive";

export const CardPerson = ({namePerson, idPerson, agePerson, genderPerson,deletePerson}) => {

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
        console.log("showSecond");
        console.log(showSecond);
        //deletePerson(id);
        toggleShowSecond(!showSecond);
    };
    return (
        <div>
            {show && <Modal  idForShow={idPerson} handleShowNext={modalMessageAll}  handleShowToggle={modalMessage}/>}
            {showSecond && <ModalPositive idForShow={idPerson} handleShowToggle={modalMessageOK}/>}
       { genderPerson
            ?<div className="card-person " onClick={modalMessage}>
                <div>name - {namePerson}, age - {agePerson}, gender - {String(genderPerson)} </div>
            </div>
            :<div className="card-person is-inactive" onClick={modalMessage}>
                <div>name - {namePerson}, age - {agePerson}, gender - {String(genderPerson)} </div>
            </div>}
        </div>
    )
};

