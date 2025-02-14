import React from "react"
//import './App.css'

function LoginPage() {
    return (
        <div className="d-flex flex-column align-items-center gap-5">
            <div>
                <h1 className="h1">Login to Access Commission Queue</h1>
                <hr className="border border-primary border-2 opacity-75"/>
            </div>
            <a href="/auth/github" className="btn btn-primary btn-lg" role="button">Login via Github</a>
        </div>
    )
}

export default LoginPage;
