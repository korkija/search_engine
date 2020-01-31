import React from "react";
import ReactDOM from "react-dom";

export class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.root = document.createElement("div");
        const body = document.querySelector("body");
        body.appendChild(this.root);
    }

    componentWillUnmount() {
        this.root.remove();
    }

    render() {
        return ReactDOM.createPortal(
            <div className=" portal-wrapper">
                <div className="modal flex-container-for-modal">
                    <div>
                        Вы действительно хотите пригласить на свидание пользователя с id = {this.props.idForShow}?
                    </div>
                    <div>
                        <button className="dropdown-my" onClick={this.props.handleShowNext}>да</button>
                        <button className="dropdown-my" onClick={this.props.handleShowToggle}>нет</button>
                    </div>
                </div>
            </div>,
            this.root)
    }
}
