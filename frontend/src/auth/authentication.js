import axios from "axios";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  axios.defaults.baseURL = "http://localhost:8000";
} else {
  // production code
}

async function register(data) {
  const authEndpoint = `/auth/`;
  return axios
    .post(authEndpoint, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

async function login(data) {
  const authEndpoint = `/auth/login/`;
  return axios
    .post(authEndpoint, data)
    .then((response) => {
      console.log(response);
      const key = response.data.token;
      const username = response.data.username;
      localStorage.setItem("access_key", key);
      localStorage.setItem("username", username);
    })
    .catch((error) => {
      throw error;
    });
}

async function logout() {
  if (localStorage.getItem("access_key") !== null) {
    const authEndpoint = `/auth/logout/`;
    const access_key = localStorage.getItem("access_key");
    axios
      .post(authEndpoint, {
        headers: {
          Authorization: `Token ${access_key}`,
        },
      })
      .then((response) => {
        console.log("Logged out");
        localStorage.clear();
        return response.data;
      })
      .catch((error) => error);
  }
}

function handleAuthErrors(error) {
  /*  
    Function get errors response from server and returns corresponding error
  */
  const errors = error.response.data;
  if (error.response.data.length == 0) {
    return 0;
  }
  for (const [key, value] of Object.entries(errors)) {
    if (key === "username") {
      return value[0].replace("username", "credentials");
    } else if (key === "password1") {
      return value[0];
    } else if (key === "non_field_errors") {
      return value[0];
    }
  }
}

export { register, logout, login, handleAuthErrors };
