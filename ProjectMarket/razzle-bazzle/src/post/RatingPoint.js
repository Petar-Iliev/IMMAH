import React from 'react'



function RatingPoint(props){


 

    return(
        <div className={`rating-point ${props.ad}`} onClick={()=>props.rateM(props.index)}>
        <img src={props.emoji}></img>
        <span>{props.rate}</span>
    </div>
    )
}

export default RatingPoint;