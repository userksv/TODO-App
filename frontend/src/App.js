// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodoApp from "./components/TodoApp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

const App = () => {
  const [isAuth, setAuth] = useState(false);
  useState(()=>{
    if(localStorage.getItem('access_key') !== null){
      // check local storage if it contains access_key, then user is authenticated
      // set Auth and pass it to Navbar component for rendering 
      setAuth(true)
    }
  }, [isAuth]);

  return (
    <Router>
      <div className="container mt-3">
        <Navbar isAuth={isAuth}/>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
