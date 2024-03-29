// import "../styles/Form.css";
import React from 'react'
import Todos from "./Todos/Todos";
import  Login  from "./Login/Login";

function Form() {
  // const [count, setCount] = useState(0)
  // const [reset, resetCount] = useState(0)

  function aboutMe() {
    console.log("You clicked the about me list item!");
  }

  function work() {
    console.log("You clicked the work list item!");
  }
  function education() {
    console.log("You clicked the education list item!");
  }

  return (
    <div className="Form">
      <Login/>

      <h1>Toma Ligia Patricia</h1>
      <div className="card">
        <ul className="about">
          <li id="aboutme" onClick={() => aboutMe()}>
            About me
          </li>
          <li id="work" onClick={() => work()}>
            Work experience
          </li>
          <li id="education" onClick={() => education()}>
            Education
          </li>
        </ul>

        <div className="detail"></div>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default Form;

{
  /* might use later:
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>    */
}
