import React from 'react'
// import { Link } from 'react-router-dom'
import {HashLink} from 'react-router-hash-link'

const Header = () => {
  return (
    <nav>
        <h1>TOH</h1>
        <main>
            <HashLink to ={"/#Home"}>Home</HashLink>
            <HashLink to ={"/#aboutUs"}>About Us</HashLink>
            <HashLink to ={"/#contactUs"}>Contact</HashLink>
            <HashLink to ={"/services"}>Services</HashLink>
            <HashLink to ={"/feedback"}>Feedback</HashLink>

        </main>
    </nav>
  )
}

export default Header