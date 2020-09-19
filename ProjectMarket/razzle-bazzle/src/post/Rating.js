import React from 'react';
import RatingPoint from './RatingPoint';
import angry from '../static/svgs/emojis/angry.svg';



const selectedAdClass = `selected-rating`

import mote from '../emojis';
  
function Rating(props){
    const emojis=[
        {rate:"Bad",emoji:mote[1]},
        {rate:"Very Bad",emoji:mote[2]},
        {rate:"Don't try this at home",emoji:mote[3]},
        {rate:"Can't ask for any worser",emoji:mote[4]},
        {rate:"FFS",emoji:mote[5]},
    ];

 function handleRate(index){
    props.handleRating(index);
 }


 const ratings =emojis.map((e,i)=><RatingPoint  rateM={handleRate} key={i} index={i}  rate={e.rate} ad={props.selected === i ? selectedAdClass : ''} emoji={e.emoji}  /> )
 

    return(
        <div className="rating-wrapper">
            <h3>Rate your experience.</h3> 
            <div className="rating-points-wrapper">
            {ratings}
            </div>
        </div>
    )
}

export default Rating;