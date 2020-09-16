import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import './static/css/header.css';

import AuthContext from './context/AuthContext';

function Header(){


    const {user,setUser} = useContext(AuthContext);
    
    

    return(
      <div className='nav'>
          <div className='hom-logo'>
              <h4>IMMAH</h4>
          </div>
          <div className='nav-links'>
          <Link to="/"  className="nav-item super-link">HOME</Link>
         <Link to="/posts" className="nav-item">POSTS</Link>
         <Link to='/companies' className='nav-item'>COMPANIES</Link>
         {user !=null ?
   <Link to='/' onClick={()=>setUser(null)}>Logout</Link>
   :
   <>
   <Link to="/login" className="nav-item">LOGIN</Link>
   <Link to="/register" className="nav-item">SIGN UP</Link>
   </>
}

          </div>
      </div>
    )
}

export default Header;





{/* <nav className="nav-bar">
<ul className="nav-ul">
    <Link to="/" className="nav-item">HOME</Link>
    <Link to="/posts" className="nav-item">POSTS</Link>
    <Link to='/companies' className='nav-item'>COMPANIES</Link>
    {user !=null ?
   <Link to='/' onClick={()=>setUser(null)}>Logout</Link>
   :
   <>
   <Link to="/login" className="nav-item">LOGIN</Link>
   <Link to="/register" className="nav-item">SIGN UP</Link>
   </>
   }
   
</ul>
</nav> */}