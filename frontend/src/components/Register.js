import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register, handleAuthErrors } from "../auth/authentication";

const Register = () => {
  const [registered, setRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState();

  // IN DEV MODE REACT RENDERS TWICE THIS TRIGGERS ERROR WHEN NEW USER IS REGISTERED
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password1: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: formData.email,
      username: formData.email.split("@")[0],
      password1: formData.password1,
      password2: formData.password2,
    };
    try {
      const res = await register(data);
      setRegistered(true);
      setUsername(data.username);
      return;
    } catch (error) {
      setError(handleAuthErrors(error));
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {
                registered && (
                  <>
                    <h3 className="text-center">Registration succesfull.</h3>
                    <p className="text-center">
                      Your login is{" "}
                      <span className="text-danger">{username}</span> use it to
                      login.
                    </p>
                  </>
                ) /* ***** */
              }
              {!registered && (
                <>
                  <h3 className="card-title text-center">Register</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      {error && <p style={{ color: "red" }}>{error}</p>}

                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password1"
                        name="password1"
                        value={formData.password1}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
