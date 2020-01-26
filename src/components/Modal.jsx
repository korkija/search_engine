import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class modal extends React.Component {

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

    handleSelect = (event) => {

    };

    render() {

        const handleSelectSame = this.handleSelect;
        return ReactDOM.createPortal(
            <div>
                <div className=" portal-wrapper" >
                    <div  className="modal " >
                        Вы действительно хотите пригласить на свидание пользователя с id = {this.props.idForShow}?
                        <button className="dropdown-my" onClick={this.props.handleShowNext}>да</button>
                        <button className="dropdown-my" onClick={this.props.handleShowToggle}>нет</button>
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
        // setSessionSpaceEmpty,
        // addTickets,
        // deleteTickets
    };
export const
    Modal= connect(
        mapStateToProps,
        mapDispatchToProps
    )(modal);


//
