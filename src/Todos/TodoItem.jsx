import { useState } from "react";

export function TodoItem({ data, onDeleteTodo, onUpdateTodoStatus }) {
  const [checked, setChecked] = useState(data.completed);
  return (
    <li>
      <label>
        <input
          type="checkbox"
          defaultChecked={data.completed}
          onChange={(e) => onUpdateTodoStatus(data.id, Boolean(e.target.checked))}
        />
        {data.title}
      </label>
      <button type="button" onClick={(e) => onDeleteTodo(e.target.id)}>
        &times;
      </button>
    </li>
  );
}
