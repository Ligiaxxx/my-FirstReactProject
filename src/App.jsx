import { BrowserRouter } from "react-router-dom";
import "../styles/App.css";

function App() {
  return (
    // <div className="App">
    //   <h1>Hello from App</h1>
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
