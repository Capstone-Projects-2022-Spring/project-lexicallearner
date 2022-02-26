import React from 'react'
import './Navbar.css'
import * as BsIcons from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <div className='Navbar'>
            <ul>
                <li>
                    <span className='logo'>Lexical</span>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to='upload'>
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar