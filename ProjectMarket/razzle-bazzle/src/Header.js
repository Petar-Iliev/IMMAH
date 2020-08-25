import React from 'react';
import {Link} from 'react-router-dom';
import './static/css/header.css';

function Header(){


    return(
        <nav className="nav-bar">
             <ul className="nav-ul">
                 <Link to="/" className="nav-item">HOME</Link>
                 <Link to="/" className="nav-item">POST</Link>
                 <Link to="/" className="nav-item">LOGIN</Link>
                 <Link to="/" className="nav-item">REGISTER</Link>
             </ul>
        </nav>
    )
}

export default Header;