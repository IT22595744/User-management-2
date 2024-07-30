import React from 'react';
import { Route,Routes } from 'react-router';
import './App.css';
import Home from "./Components/Home/Home";
import AddUser from "./Components/AddUser/AddUser";
import Users from "./Components/UserDetails/Users";
import Updateuser from './Components/Updateuser/Updateuser';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Contactus from './Components/Contactus/Contactus';
import Sendpdf from './Components/Sendpdf/Sendpdf';


function App() {
  return (
    <div>
        <React.Fragment>
          <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/mainhome" element={<Home/>} />
            <Route path="/adduser" element={<AddUser/>} />
            <Route path="/userdetails" element={<Users/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/log" element={<Login/>} />
            <Route path="/conus" element={<Contactus/>} />
            <Route path="/sendpdf" element={<Sendpdf/>} />
            <Route path="/userdetails/:id" element={<Updateuser/>}/>
          </Routes>
        </React.Fragment>
    </div>
  );
}

export default App;
