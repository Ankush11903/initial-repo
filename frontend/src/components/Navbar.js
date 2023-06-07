import React from 'react'
import { Link } from 'react-router-dom'
// creating a navbar component

function Navbar() {
  return (

    <div>
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <Link to="/dashboard"><div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Dashboard</span>
                </div></Link> 
             
            <Link to="/"> <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Home</span>
                </div></Link> 
            <Link to="/client"> <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Clients</span>
                </div></Link> 
            <Link to="/login"> <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Login</span>
                </div></Link>
            <Link to="/register"> <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Register</span>
                </div></Link>
                </nav>
    </div>
  )
}

export default Navbar