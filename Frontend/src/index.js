import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

//bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

//bootstrap bundle js
import "bootstrap/dist/js/bootstrap.bundle.min";
ReactDOM.render(
  <BrowserRouter>
   <React.StrictMode>
    <App/>
   </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

