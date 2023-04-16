import { useState } from "react";

export function MeniuItem({ data, onDeleteTodo, onUpdateTodoStatus }) {

    return (
        <li>
          <label>
            <input
        
              onChange={(e) => onUpdateTodoStatus(data.id, data.name)}
            />
            {/* {data.title} */}
          </label>
          <button type="button" onClick={(e) => onDeleteTodo(e.target.id)}>
            &times;
          </button>
        </li>
      );
}