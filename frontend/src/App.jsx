import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import ToDoPage from "./ToDoPage.jsx";
import axios from "axios";

function App() {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("backend/user")
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, [])


    if(loading) {
        return <div>Loading...</div>
    }


    return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/queue" element={user ? <ToDoPage/> : <Navigate to="/" />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
