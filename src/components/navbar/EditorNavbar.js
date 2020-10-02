import React from "react"
import { Link } from "react-router-dom"

function EditorNavbar(props) {
    return (
        <nav id="navbar-main" className="navbar h-px-60 fixed-top bg-white py-md-3">
            <div className="container mt-md-3">
                <Link className="navbar-brand mr-lg-5" to="/">
                    <img src={require("assets/img/logo.png")} alt="load failed" />
                </Link>
                
            </div>
        </nav>
    )
}
export default EditorNavbar