import React, { useState } from "react";
import { editTask } from "../api/services";
import { useNavigate } from "react-router-dom";

const EditTask = ({ task, onCancel }) => {
  const navigate = useNavigate();
  const [editedTask, setEditedTask] = useState(task);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} - ${value}`);
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // send put request
      const res = await editTask(editedTask);
      window.location.href = "/";
      // navigate("/"); // submit on `Enter and on Click does not work` ask somebody
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
