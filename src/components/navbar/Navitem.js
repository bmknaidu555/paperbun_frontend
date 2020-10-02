import React from "react"
import {Link }from "react-router-dom"

function Navitem(props){
    return(
        <li className="nav-item">
            <Link className="nav-link nav-link-icon" to={props.to} data-toggle="tooltip" 
                                        title={props.linkTitle}>
                <i className={props.itemIcon}></i>
                <span className="nav-link-inner--text ">{props.itemName}</span>
            </Link>
    </li>
    )
}

export default Navitem