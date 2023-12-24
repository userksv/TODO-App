import React, { useState, useEffect } from 'react';
import { addNewTask, fetchTasks } from '../api/services';

export default function Todos(props) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask ] = useState('');
  const [isAuth, setAuth] = useState(props.isAuth);
  function handleAddTask(e){
    e.preventDefault();
    if(newTask === ''){
      return;
    }
    console.log(newTask);
    const title = newTask.slice(0, 5);
    addNewTask(title, newTask);
    /// update useeffect
    setNewTask('');
  }
  function handleEditTask(){}
  function handleDeleteTask(){}
  
  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuth) {
        try {
          const tasksData = await fetchTasks();
          setTasks(tasksData);
          // if(tasksData === undefined){
          //   return <h1>You have no tasks!</h1>;
          // }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
    checkAuthentication();
  }, [tasks]);
 
  return (
    
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body text-center">
            {!isAuth && <h3>Login to continue</h3>/* ***** */}
          
            {isAuth &&  /* *** */
            <section>
            <form onSubmit={handleAddTask}>
              <div className="mb-3">
                <label htmlFor="new-todo-input" className="form-label h2">
                  What needs to be done?
                </label>
                <input
                  type="text"
                  id="new-todo-input"
                  className="form-control form-control-lg"
                  name="text"
                  autoComplete="off"
                  value={newTask}
                  onChange={(e)=>setNewTask(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary  w-100">
                Add
              </button>
            </form>
            <div className="btn-group btn-group-sm mt-3 d-flex" role="group">
                <button type="button" className="btn btn-outline-dark btn-blcok rounded me-1 active">
                  All
                </button>
                <button type="button" className="btn btn-outline-dark btn-blcok rounded me-1">
                  Active
                </button>
                <button type="button" className="btn btn-outline-dark btn-blcok rounded me-1">
                  Completed
                </button>
              </div>
            <h2 id="list-heading" className="mt-3">
              {tasks.length} tasks remaining
            </h2>
            <ul
              role="list"
              className="list-group mt-3"
              aria-labelledby="list-heading"
            >
              {tasks.map((task)=>(
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    id="todo-0"
                    type="checkbox"
                    defaultChecked
                    className="form-check-input"
                  />
                  <label
                    className="form-check-label todo-label"
                    htmlFor="todo-0"
                  >
                    {task.title}
                  </label>
                </div>
                <div className="btn-group btn-group-sm">
                  <button type="button" className="btn btn-warning rounded me-1">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger rounded me-1">
                    Delete
                  </button>
                </div>
              </li>
              ))}
              {/* Additional Tasks Go Here */}
            </ul>
            </section>
            /* *** */}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
