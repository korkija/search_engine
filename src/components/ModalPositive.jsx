import React from "react";
import ReactDOM from "react-dom";

export class ModalPositive extends React.Component {

    constructor(props) {
        super(props);
        this.root = document.createElement("div");
        const body = document.querySelector("body");
        body.appendChild(this.root);
    }

    componentWillUnmount() {
        this.root.remove();
    }

    // handleSelect = (id) => {
    //     console.log("getDeletePerson");
    //     this.props.handleShowToggle();
    //     this.props.getDeletePerson(id);
    // };

    render() {
        return ReactDOM.createPortal(
                <div className="portal-wrapper">
                    <div className="modal-positive flex-container-for-modal-positive">
                        <div>
                            Приглашение отправлено
                        </div>
                        <div>
                            <button className="dropdown-my" onClick={() => this.props.handleShowToggle(this.props.idForShow)}>Ok
                            </button>
                        </div>
                    </div>
                </div>,
            this.root)
    }
}
// const
//     mapStateToProps = (state) => ({
//     });
// const
//     mapDispatchToProps = {
//        // getDeletePerson,
//     };
// export const
//     ModalPositive = connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )(modalPositive);
//

//
