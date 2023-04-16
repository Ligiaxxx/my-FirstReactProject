import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function Auth() {
  // const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    retype_password: "",
    fName: "",
    lName: "",
  });

  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userObj = { ...values };
    delete userObj.retype_password;
    
    // navigate.push("/todos");

    fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      // Navigate to /todos after the form is submitted successfully
      // navigate("/todos");
    });
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="retype_password">Retype Password</label>
          <input
            type="password"
            id="retype_password"
            name="retype_password"
            value={values.retype_password}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="fName"></label>First Name
          <input
            type="text"
            id="fName"
            name="fName"
            value={values.fName}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="lName"></label>Last Name
          <input
            type="text"
            id="lName"
            name="lName"
            value={values.lName}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <button type="submit">Register</button>
        </p>
      </form>
      <Link to="/todos">Todos</Link>
    </>
  );
}
