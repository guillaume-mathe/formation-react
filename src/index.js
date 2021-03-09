import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';
import {makeServer} from "./mirage";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import chLocale from "date-fns/locale/fr-CH";
import TodoList from "./todoList";
import FormulaireTache from "./formulaireTache";

/* MirageJS en dev local */
if (process.env.NODE_ENV === "development") {
    makeServer({ environment: "development" });
    console.log("Mirage server ready !");
}

ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={chLocale}>
        <TodoList />
    </MuiPickersUtilsProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
