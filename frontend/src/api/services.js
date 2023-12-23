import axios from "axios";

async function fetchTasks() {
  const apiEndpoint = "http://localhost:8000/tasks/";
  try {
    const response = await axios.get(apiEndpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it at the calling site if needed
  }
}

async function addTask(title, text) {
  console.log(`${title}---${text}`);
  const apiEndpoint = "http://localhost:8000/tasks/";
  try {
    const response = await axios.post(apiEndpoint, {
      title: title,
      description: text,
    });
    // Handle the response if needed
    console.log("Task added successfully:", response.data);
  } catch (error) {
    // Handle errors
    console.error("Error adding task:", error);
    throw error;
  }
}

export { fetchTasks, addTask };
