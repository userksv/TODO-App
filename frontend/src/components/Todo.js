import React from "react";

function Todo(pros) {
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input id={pros.id} type="checkbox" defaultChecked={pros.completed} />
        <label className="todo-label" htmlFor="todo-0">
          {pros.title}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn">
          Edit <span className="visually-hidden">{pros.title}</span>
        </button>
        <button type="button" className="btn btn__danger">
          Delete <span className="visually-hidden">{pros.title}</span>
        </button>
      </div>
    </li>
  );
}

export default Todo;
