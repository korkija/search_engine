import React from 'react';
import 'antd/dist/antd.css';
import '../style/index.css';
import {connect} from "react-redux";
import {CardPerson} from "./CardPerson";


export const ListPerson = ({peopleFilterForPage,deletePerson}) => {
    return (

            <div className="container ">
                {peopleFilterForPage.map((item, index, array) => (
                    <div key={item._id}>
                        {((index === 0) || (String(array[index - 1].row)[0] != String(item.row)[0])) &&
                        <div>{String(item.row)[0]}</div>}
                        <CardPerson
                                    namePerson={item.row}
                                    idPerson={item._id}
                                    agePerson={item.place}
                                    genderPerson={item.booked}
                                    deletePerson={()=>deletePerson}
                                    />
                    </div>
                ))}

            </div>
    )
};

    //     class ListPerson extends React.Component {
    //
    //         //this.props.history.push
    //
    //         modalMessage = () => {
    //             //<Link to="/sessions"><button onClick={this.handleShowSessions()}>Посмотреть сеансы</button></Link>
    //             // this.props.history.push("/sessions");
    //         };
    //
    //         render() {
    //             // const {, poster, description, country, trailer} = this.props.peopleFilter;
    //             //const isLoading = this.props.isLoading;
    //
    //             return (
    //                 this.props.isLoading
    //                     ? <div>Loading</div>
    //                     :
    //                     <div className="container ">
    //                         {this.props.peopleFilter.map((item, index, array) => (
    //                             <div>
    //                                 {((index === 0) || (String(array[index - 1].row)[0] != String(item.row)[0])) &&
    //                                 <div>{String(item.row)[0]}</div>}
    //                                 <CardPerson key={item._id}
    //                                             namePerson={item.row}
    //                                             agePerson={item.place}
    //                                             genderPerson={item.booked}
    //                                             modalMessage={this.modalMessage}/>
    //                             </div>
    //                         ))}
    //
    //                     </div>
    //             )
    //         };
    //     }
    //
    // const mapStateToProps = (state) => ({
    //     isLoading: state.people.isLoading,
    //     peopleFilter: state.people.peopleFilter
    // });
    //
    // export const
    //     MyListPerson = connect(
    //         mapStateToProps,
    //     )(ListPerson);


