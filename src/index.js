import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import {MyApp} from '../src/components/App';
import {store} from "./store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <MyApp />
    </Provider>
    , document.getElementById('root'));
//ReactDOM.render(<ButtonCounter />, document.getElementById('root'));

