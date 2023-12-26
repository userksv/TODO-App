import React, { useState, useEffect } from "react";
import {
  addNewTask,
  fetchTasks,
  completeTask,
  deleteTask,
} from "../api/services";
import EditTask from "./EditTask";

export default function Todos(props) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isAuth, setAuth] = useState(props.isAuth);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  async function handleCheckbox(task, checked) {
    if (isAuth) {
      try {
        const res = await completeTask(task, checked); // change `completed` on backend
        const updatedTasks = await fetchTasks(); // fetch updated tasks
        setTasks([...updatedTasks]); // why -> setTasks(updatedTasks) not updating checkbox state
        setFilteredTasks([...updatedTasks]); // why -> setFilteredTasks(updatedTasks) not updating checkbox state
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
  }

  //////////////////////////////////////////
  async function handleFilterTasks(e) {
    switch (e) {
      case "all":
        setFilteredTasks(tasks);
        setActiveFilter("all");
        break;
      case "active":
        const activeTasks = tasks.filter((task) => !task.completed);
        setFilteredTasks(activeTasks);
        setActiveFilter("active");
        break;
      case "completed":
        const completedTasks = tasks.filter((task) => task.completed);
        setFilteredTasks(completedTasks);
        setActiveFilter("completed");
        break;
      default:
        return;
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    if (newTask === "") {
      return;
    }
    const title = newTask.slice(0, 5);
    if (isAuth) {
      try {
        const res = await addNewTask(title, newTask);
        const taskData = await fetchTasks(); // fetch updated tasks
        setTasks(taskData);
        setFilteredTasks(taskData);
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
    setNewTask("");
  }

  async function handleEditTask(task) {
    setIsEditing(true);
    setTask(task);
    // console.log("Task from handle task", task);

    // <EditTask task={task} />;
  }

  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleSave = () => {
    setIsEditing(false);
    // update all tasks
  };
  async function handleDeleteTask(task) {
    if (isAuth) {
      try {
        const res = await deleteTask(task);
        const taskData = await fetchTasks(); // fetch updated tasks
        setTasks(taskData);
        setFilteredTasks(taskData);
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
  }

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuth) {
        try {
          const tasksData = await fetchTasks();
          setTasks(tasksData); // learn more about asynchronous
          setFilteredTasks(tasksData); // learn more about asynchronous
          // console.log(tasksData) it will be empty, beacause fetchTasks returns `promise`
          // `promise` occur after component finishes executing
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
    checkAuthentication();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              {!isAuth && <h3>Login to continue</h3> /* ***** */}

              {
                isAuth /* *** */ && (
                  <section>
                    <form onSubmit={handleAddTask}>
                      <div className="mb-3">
                        <label
                          htmlFor="new-todo-input"
                          className="form-label h2"
                        >
                          What needs to be done?
                        </label>
                        <input
                          type="text"
                          id="new-todo-input"
                          className="form-control form-control-lg"
                          name="text"
                          autoComplete="off"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary  w-100">
                        Add
                      </button>
                    </form>
                    <div
                      className="btn-group btn-group-sm mt-3 d-flex"
                      role="group"
                    >
                      <button
                        type="button"
                        className={`btn btn-outline-dark btn-blcok rounded me-1 ${
                          activeFilter === "all" ? "active" : ""
                        }`}
                        value={"all"}
                        onClick={(e) => handleFilterTasks(e.target.value)}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        className={`btn btn-outline-dark btn-blcok rounded me-1 ${
                          activeFilter === "active" ? "active" : ""
                        }`}
                        value={"active"}
                        onClick={(e) => handleFilterTasks(e.target.value)}
                      >
                        Active
                      </button>
                      <button
                        type="button"
                        className={`btn btn-outline-dark btn-blcok rounded me-1 ${
                          activeFilter === "complited" ? "active" : ""
                        }`}
                        value={"completed"}
                        onClick={(e) => handleFilterTasks(e.target.value)}
                      >
                        Completed
                      </button>
                    </div>
                    {isEditing && (
                      <EditTask task={task} onCancel={handleCancel} />
                    )}
                    {!isEditing && (
                      <>
                        <h2 id="list-heading" className="mt-3">
                          {tasks.length} tasks remaining
                        </h2>
                        <ul
                          role="list"
                          className="list-group mt-3"
                          aria-labelledby="list-heading"
                        >
                          {filteredTasks.map((task) => (
                            <li
                              key={task.id}
                              className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <div className="form-check">
                                <input
                                  id={task.id}
                                  type="checkbox"
                                  checked={task.completed}
                                  className="form-check-input"
                                  onChange={(e) =>
                                    handleCheckbox(task, e.target.checked)
                                  }
                                />

                                {/* Add horizontal line here */}

                                <label
                                  className="form-check-label todo-label"
                                  htmlFor="todo-0"
                                >
                                  {task.description.slice(0, 30)}
                                </label>
                              </div>
                              <div className="btn-group btn-group-sm">
                                <button
                                  type="button"
                                  className="btn btn-warning rounded me-1"
                                  onClick={(e) => handleEditTask(task)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger rounded me-1"
                                  onClick={(e) => handleDeleteTask(task)}
                                >
                                  Delete
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </section>
                )
                /* *** */
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
