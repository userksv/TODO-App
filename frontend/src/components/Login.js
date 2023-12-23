import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const LoginForm = () => { // accepting function
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleLogin = (e) => {
    const loginEndpoint = "http://localhost:8000/auth/login/";
    e.preventDefault();
    // Add your login logic here (e.g., API call, authentication)
    axios
      .post(loginEndpoint, {
        username: username,
        password: password,
      })
      .then(function (response) { // is success
        localStorage.clear();
        localStorage.setItem("access_key", response.data.key)
        window.location.href = '/';        
      })
      .catch(function (error) {
        console.log(error);
        // Set the error message to be displayed to the user
        setError('Invalid username or password. Please try again.');
      });
    // For demonstration purposes, just log the credentials for now
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
