import React from 'react';
import {connect} from "react-redux";
import {Router} from "react-router-dom";
import {Layout} from 'antd';
import {createBrowserHistory} from "history";
// import {Main} from "../routs/index";

import '../style/App.css';
import 'antd/dist/antd.css';
import '../style/index.css';
import {getPage, getPeople, getChangeSizePage, getResetFilter, getDeletePerson} from "../actions/people";
import {MyFilters} from "./Filters";
import {PaginationMy} from "./Pagination";
import {ListPerson} from "./ListPeople";

const {Content, Footer} = Layout;

export const history = createBrowserHistory();

class App extends React.Component {
    componentDidMount() {
        this.props.getPeople();
    }

    render() {
        let startOfPage = (this.props.page - 1) * this.props.pageSize;
        let endOfPage = (this.props.page) * this.props.pageSize;
        return (
            <Layout>
                <Router history={history}>

                    {this.props.isLoading
                        ? <div>Loading</div>
                        :
                        <div>
                            <MyFilters/>

                            <ListPerson
                                peopleFilterForPage={this.props.peopleFilter.slice(startOfPage, endOfPage)}
                                // deletePerson={this.props.getDeletePerson}
                            />
                            <PaginationMy totalForPages={this.props.totalForPages}
                                          page={this.props.page}
                                          pageChange={this.props.getPage}
                                          pageSizeChange={this.props.getChangeSizePage}/>
                        </div>
                    }
                    <Content style={{padding: '0 50px', marginTop: 64}}>

                        <div style={{background: '#eee', padding: 24, minHeight: 380}}>
                            {/*<Main/>*/}
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
   // getDeletePerson,
};
export const MyApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

