import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    return (
        <div className='nav'>
            <center>
            <Link className='link' to={"/boxlist"}>BoxList </Link>
    
            <Link className='link' to={"/boxform"}>BoxForm </Link>
            </center>
        </div>
      )
}

export default NavBar