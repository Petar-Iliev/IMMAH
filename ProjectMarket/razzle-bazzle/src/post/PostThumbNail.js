import React from 'react';
import {Link,Route} from 'react-router-dom'


function ThumbNail({logo,companyName,rating,username,post_id}){

    console.log(logo);
    
    return(

      
      <div className='post-thumbnail'>
        <Link to={`/post/${post_id}`}>
        <div className="post-thumbnail-header">
        <img src={logo} className='logo-pic' alt='Company logo'/>
         <h5>{companyName}</h5>
            <p>{username}</p>
        </div>
        </Link>
        <div className='post-thumbnail-footer'>
            <span>RATING </span>
            <span>{rating}</span>
        </div>
        </div>
 
    )
}


export default ThumbNail;