import React from 'react'


function SlideImage(props){

    return(
      <div className="split right">
        <div className="intro-img centered">
        <img src={props.pic} alt="man with a suit with his left hand behind his back and the right hand is showing the text."/>
      </div>
      </div>
    )
}

export default SlideImage;