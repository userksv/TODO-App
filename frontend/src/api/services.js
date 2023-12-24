import axios from "axios";

async function deleteTask(){
  const apiEndpoint = 'http://loclahost:8000/tasks/'
}

async function fetchTasks() {
  const apiEndpoint = "http://localhost:8000/tasks/";
  const access_key = localStorage.getItem('access_key');
  return axios.get(apiEndpoint, {headers:{
    Authorization: `Token ${access_key}`}
  }).then((response)=>response.data).catch((error)=>console.error(error));
  // try {
  //   const response = await axios.get(apiEndpoint);
  //   return response.data;
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }
}

async function addNewTask(title, text) {
  console.log(`${title}---${text}`);
  const token = localStorage.getItem("access_key");
  const apiEndpoint = "http://localhost:8000/tasks/";
  const data = {
    title: title, description: text
  }
  try {
    const response = await axios.post(apiEndpoint, data, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    // Handle the response if needed
    console.log("Task added successfully:", response.data);
  } catch (error) {
    // Handle errors
    console.error("Error adding task:", error);
    throw error;
  }
}

export { fetchTasks, addNewTask };
