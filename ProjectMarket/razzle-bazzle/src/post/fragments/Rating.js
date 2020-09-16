import React from 'react';
import angry from '../../static/svgs/emojis/angry.svg';

function Rating({rating}){


    return(

        <>
        <div className="post-rated-points">
        <img src={angry}/>
        <span>{rating} / 5 </span>
        </div>
      
        </>
    )
}

export default Rating;