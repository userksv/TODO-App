import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const isAuth = props.isAuth;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="" id="navbarNav">
          <ul className="navbar-nav">
            {!isAuth ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Todos
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
