import axios from "axios";

async function register(data) {
  const authEndpoint = "http://localhost:8000/auth/";
  return axios
    .post(authEndpoint, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

async function login(data) {
  const authEndpoint = "http://localhost:8000/auth/login/";
  return axios
    .post(authEndpoint, data)
    .then((response) => {
      const key = response.data.key;
      localStorage.setItem("access_key", key);
    })
    .catch((error) => {
      throw error;
    });
}

async function logout() {
  if (localStorage.getItem("access_key") !== null) {
    const authEndpoint = "http://localhost:8000/auth/logout/";
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

function handleAuthErrors(errors) {
  console.log(errors);
  //   let err = errors.forEach((error) => {
  //     console.log(error);
  //   });
  //   console.log(typeof errors);
}
export { register, logout, login, handleAuthErrors };
