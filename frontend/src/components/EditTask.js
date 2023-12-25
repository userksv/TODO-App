import React, { useState } from "react";
import { editTask } from "../api/services";

const EditTask = ({ task, onCancel }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} - ${value}`);
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // send put request
    try {
      const res = await editTask(editedTask);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-task-container">
      <h4>Make changes: </h4>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>{editedTask.title}</label>
          <input
            className="w-100"
            type="text"
            name="description"
            defaultValue={editedTask.description}
            onChange={handleOnChange}
          />
        </div>
        {/* Add more input fields as needed for other task properties */}
        <div className="button-group">
          <button type="submit" className="btn btn-success">
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
