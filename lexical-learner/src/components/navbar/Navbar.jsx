import React from 'react'
import './Navbar.css'
import * as BsIcons from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <div className='Navbar'>
            <ul>
                <li>
                    <BsIcons.BsChatSquareText 
                        style={{fontSize: '2rem', marginRight: '0.5rem'}}/>
                    <span className='logo'>Lexical Chat</span>
                </li>
            </ul>
            <ul>
                <li>
                    About
                </li>
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