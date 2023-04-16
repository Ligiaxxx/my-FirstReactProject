import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import data from "/db.json";
import Form from "../Form";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch user data from the JSON database
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        const user = data.users.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          // console.log('Login successful!');

          // Redirect to the user's dashboard or some other page
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((error) => {
        setError("An error occurred while trying to login");
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit"> 
        <Link to="/start">Submit</Link>
        </button>
      </form>
    </>
  );
}

export default Login;
