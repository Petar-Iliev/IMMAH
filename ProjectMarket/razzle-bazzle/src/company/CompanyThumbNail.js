import React from 'react';
import {Link} from 'react-router-dom';

function CompanyThumbNail({id,posts,rating,name,logo}){

    let companyRating = rating/posts.length;


    return(
      
<div className='post-thumbnail'>
<Link to={`/company/${id}`}>
<div className="post-thumbnail-header">
<img src={logo} className='logo-pic' alt='Company logo'/>
 <h5>{name}</h5>
</div>
</Link>
<div className='post-thumbnail-footer'>
    <span>RATING </span>
    <span>{companyRating}</span>
</div>
</div>

    )
}

export default CompanyThumbNail;