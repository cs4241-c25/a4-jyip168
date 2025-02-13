import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/queue" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
