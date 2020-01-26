import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getDeletePerson} from "../actions/people";
import {GET_DELETE_PERSON} from "../constants";

class modalPositive extends React.Component {

    constructor(props) {
        super(props);

        this.root = document.createElement("div");
        const body = document.querySelector("body");
        body.appendChild(this.root);
        console.log(this.root);
    }

    componentWillUnmount() {
        //this.props.setSessionSpaceEmpty();
        this.root.remove();
    }

    handleSelect = (id) => {
        console.log("getDeletePerson");
        this.props.handleShowToggle();
        this.props.getDeletePerson(id);

        // return function (dispatch){
        //     return (id => {
        //         // dispatch
        //         dispatch( {
        //             type: GET_DELETE_PERSON,
        //             id,
        //         })
        //     })
        // };

    };

    render() {
        //const handleSelectSame = this.handleSelect;
        return ReactDOM.createPortal(
            <div>
                <div className=" portal-wrapper">
                    <div  className="modal " >
                        Приглашение отправлено
                        <button className="dropdown-my"  onClick={()=>this.handleSelect(this.props.idForShow)}>Ok</button>
                    </div>

                </div>
            </div>,
            this.root)
    }
}


const
    mapStateToProps = (state) => ({
        // //isLoading: state.movies.isLoading,
        // tickets: state.movies.tickets,
        // sessionSpace: state.movies.sessionSpace,
    });
const
    mapDispatchToProps = {
        getDeletePerson,
        // setSessionSpaceEmpty,
        // addTickets,
        // deleteTickets
    };
export const
    ModalPositive = connect(
        mapStateToProps,
        mapDispatchToProps
    )(modalPositive);


//
