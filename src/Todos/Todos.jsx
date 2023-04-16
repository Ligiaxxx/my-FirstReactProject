import  { useRef } from "react";
import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import styles from "./Todos.module.css";
// import { useHistory } from 'react-router-dom';

function Todos() {
  const [todos, setTodos] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [error, setError] = useState("");
  const titleInputRef = useRef();
  // const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  function handleInputChange(e) {
    setError("");
    setNewTodoTitle(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      setError("Please enter a title for the todo item");
      return;
    }

    const newTodo = {
      title: newTodoTitle,
      userId: 1,
      completed: false,
    };

    //Obiect
    const newTodoItem = await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());

    const updatetTodos = [...todos, newTodoItem];
    setTodos(updatetTodos);
    setNewTodoTitle("");
    titleInputRef.current.focus();
  }

  async function handleDeleteTodo(todoId) {
    console.log(todoId)
    await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: "DELETE",
    });
    const updatedTodos = todos.filter((todo) => todo.userId !== todoId);
    setTodos(updatedTodos);
  }

  async function handleUpdateTodo(todoId, completed) {
    await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newTodoTitle}
          onChange={handleInputChange}
          ref={titleInputRef}
        />
        <button type="submit">Add todo item</button>
        <p className={styles["has-error"]}>{error}</p>
      </form>
      <ul>
        {todos &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              data={todo}
              onDeleteTodo={handleDeleteTodo}
              onUpdateTodoStatus={handleUpdateTodo}
            />
          ))}
      </ul>
    </>
  );
}

export default Todos;
