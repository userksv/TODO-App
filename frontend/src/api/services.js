import axios from "axios";

async function editTask(data) {
  /* data contains url of the `task`, this implemantation on backend */
  const apiEndpoint = `${data.url}/update`;
  const access_key = localStorage.getItem("access_key");
  return axios
    .put(apiEndpoint, data, {
      headers: {
        Authorization: `Token ${access_key}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

async function deleteTask(task) {
  const apiEndpoint = `${task.url}/delete`;
  const access_key = localStorage.getItem("access_key");
  return axios
    .delete(apiEndpoint, {
      headers: {
        Authorization: `Token ${access_key}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

async function completeTask(task, completed) {
  const apiEndpoint = `${task.url}/patch`;
  const access_key = localStorage.getItem("access_key");
  const data = { completed: completed };
  return axios
    .patch(apiEndpoint, data, {
      headers: {
        Authorization: `Token ${access_key}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

async function fetchTasks() {
  const apiEndpoint = "http://localhost:8000/tasks/";
  const access_key = localStorage.getItem("access_key");
  return axios
    .get(apiEndpoint, {
      headers: {
        Authorization: `Token ${access_key}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

async function addNewTask(title, text) {
  const access_key = localStorage.getItem("access_key");
  const apiEndpoint = "http://localhost:8000/task/create";
  const data = {
    title: title,
    description: text,
  };
  return axios
    .post(apiEndpoint, data, {
      headers: {
        Authorization: `Token ${access_key}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export { fetchTasks, addNewTask, completeTask, deleteTask, editTask };
