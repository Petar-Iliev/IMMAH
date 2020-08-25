import React from 'react';
import RatingPoint from './RatingPoint';
import angry from '../static/svgs/emojis/angry.svg';



const selectedAdClass = `selected-rating`
  
function Rating(props){
    const emojis=[
        {rate:"Bad",emoji:angry},
        {rate:"Very Bad",emoji:angry},
        {rate:"Don't try this at home",emoji:angry},
        {rate:"Can't ask for any worser",emoji:angry},
        {rate:"FFS",emoji:angry},
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