import React from 'react';
import {connect} from "react-redux";
import {Router} from "react-router-dom";
import {Layout} from 'antd';
import {createBrowserHistory} from "history";
// import {Main} from "../routs/index";

import '../style/App.css';
import 'antd/dist/antd.css';
import '../style/index.css';
import {getPage, getPeople, getChangeSizePage, getDeletePerson} from "../actions/people";
import {MyFilters} from "./Filters";
import {PaginationMy} from "./Pagination";
import {ListPerson} from "./ListPeople";

const {Content, Footer, Header} = Layout;

export const history = createBrowserHistory();

class App extends React.Component {
    componentDidMount() {
        console.log("this.props.page");
        console.log(this.props.page);
         this.props.getPeople(this.props.page);
    }

    render() {
        // let startOfPage = (this.props.page - 1) * this.props.pageSize;
        // let endOfPage = (this.props.page) * this.props.pageSize;
        return (
            <Layout>
                <Router history={history}>
                    <Header><h1>LOGO :)</h1></Header>
                    <Content style={{padding: '0 50px', marginTop: 64}}>

                            <div className="flex-container">
                                <div className="flex-block-filter">
                                    <MyFilters/>
                                </div>

                                <div className="flex-block-list">
                                    {this.props.isLoading
                                        ? <div>Loading</div>
                                        :
                                        <ListPerson
                                            peopleFilterForPage={this.props.peopleFilter}
                                            // peopleFilterForPage={this.props.peopleFilter.slice(startOfPage, endOfPage)}
                                            deletePerson={this.props.getDeletePerson}
                                        />
                                    }
                                    <PaginationMy totalForPages={this.props.totalForPages}
                                                  page={this.props.page}
                                                  pageSize={this.props.pageSize}
                                                  pageChange={this.props.getPeople}
                                                  pageSizeChange={this.props.getChangeSizePage}/>
                                </div>
                            </div>

                    </Content>
                </Router>
                <Footer>Ant Disegn ©2020Created by Ant UED</Footer>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.people.isLoading,
    totalForPages: state.people.totalForPages,
    page: state.people.page,
    pageSize: state.people.pageSize,
    peopleFilter: state.people.peopleFilter,
});

const mapDispatchToProps = {
    getPeople,
    getChangeSizePage,
    getPage,
    getDeletePerson,
};
export const MyApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

