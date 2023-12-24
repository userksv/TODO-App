import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: '',
  });

  const [error, setError] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value, });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Placeholder for registration logic
    const api_endpoint = "http://localhost:8000/auth/"
    const username = formData.email.split('@')[0];
    // console.log('Registration data:', formData);
    axios.post(api_endpoint, {
        email: formData.email,
        username: username,
        password1: formData.password1,
        password2: formData.password2
      }
    )
    .then(function (response) {
      setFormData( {
        email: '',
        password1: '',
        password2: '',
      });
      console.log(response);
      setError('You created an account!')
      // window.location.href='/login';
      return;
    })
    .catch(function (error) {
      // TO DO: render multiple errors
      console.log(error.response.data);
      setError("There is an error, try again later!");
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                {error && <p style={{ color: 'red' }}>{error}</p>}

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

