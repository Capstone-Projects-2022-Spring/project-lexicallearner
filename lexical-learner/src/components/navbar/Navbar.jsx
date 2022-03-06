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
                    <Link to='dashboard'>
                        Dashboard
                    </Link>
                    <Link to='upload'>
                        Upload
                    </Link>
                    <Link to='login'>
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar