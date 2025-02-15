import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import ToDoPage from "./ToDoPage.jsx";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/queue" element={<ToDoPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
