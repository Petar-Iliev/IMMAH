import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import './static/css/header.css';

import AuthContext from './context/AuthContext';

function Header(){


    const {user,setUser} = useContext(AuthContext);
    
    

    return(
        <nav className="nav-bar">
             <ul className="nav-ul">
                 <Link to="/" className="nav-item">HOME</Link>
                 <Link to="/posts" className="nav-item">POST</Link>
                 {user !=null ?
                <Link to='/' onClick={()=>setUser(null)}>Logout</Link>
                :
                <>
                <Link to="/login" className="nav-item">LOGIN</Link>
                <Link to="/register" className="nav-item">REGISTER</Link>
                </>
                }
                
             </ul>
        </nav>
    )
}

export default Header;