import React from 'react';
import angry from '../../static/svgs/emojis/angry.svg';

import mote from '../../emojis';

function Rating({rating}){

    const emojis=[
        {rate:"Bad",emoji:mote[1]},
        {rate:"Very Bad",emoji:mote[2]},
        {rate:"Don't try this at home",emoji:mote[3]},
        {rate:"Can't ask for any worser",emoji:mote[4]},
        {rate:"FFS",emoji:mote[5]},
    ];

    return(

        <>
        <div className="post-rated-points">
        <img src={emojis[rating-1].emoji}/>
        <span>{rating} / 5 </span>
        </div>
      
        </>
    )
}

export default Rating;