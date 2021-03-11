import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';
import {makeServer} from "./mirage";
import TodoList from "./todoList";
import store from "./store";
import {Provider} from "react-redux";

/* MirageJS en dev local */
if (process.env.NODE_ENV === "development") {
    makeServer({ environment: "development" });
    console.log("Mirage server ready !");
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter initialEntries={['/']} initialIndex={0}>
            <Route path="/" component={TodoList}/>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
