import React from 'react';

function Card({img,text}){

    return(
        <div className="card"> 
          <img className="intro-img" src={img}/>
          <h1 className="card-text">{text}</h1>
        </div>
    )
}

export default Card;