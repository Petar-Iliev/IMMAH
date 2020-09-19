import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/test.css';


const Footer = () =>{

    return(
    
       
        <div className='footer'>
            <h2>IMMAH</h2>
            <div className='footer-links'>
                <a href='#' className='main-link'>HealthCare</a>
                <a href='#' >Help</a>
                <a href='#'>About</a>
                <Link to='/contact' >Contact</Link>
            </div>
        </div>
     
    )
}

export default Footer;