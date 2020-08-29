import React from 'react';
import {Link,Route} from 'react-router-dom'


function ThumbNail({companyName,rating,username,post_id}){

    
    return(

        <>
      
        <Link to={`/post/${post_id}`}>
        <div className="post-thumbnail">
            {/* <span>{companyName}</span> */}
            <p>{rating}</p>
            <p>{username}</p>
        </div>
        </Link>
      </>
    )
}


export default ThumbNail;