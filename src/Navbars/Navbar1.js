import React from "react"
import { Link } from "react-router-dom"

export const Navbar1 =() =>{
    return(
        <nav>
             <Link to='/Enseignant' style={{marginLeft:"-200px"}}>Enseignant</Link>
             <Link to='/AllForms'  style={{marginLeft:"110px"}}>Administration</Link>
       </nav>
    )
}