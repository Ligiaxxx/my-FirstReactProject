import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'


function Login(){
    // const history = useHistory()

function handleButtonClick() {
    // Navigate to the about page
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* We say that the / route should be a layout, the layout will wap all other child routes */}
          <Route path="/" element={<Nav />}>
        
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
    }

    return(
        <div>
            <h1>Hello from Login Page</h1>
            <button onClick={handleButtonClick}>Login</button>
        </div>
    )
}

export default Login;