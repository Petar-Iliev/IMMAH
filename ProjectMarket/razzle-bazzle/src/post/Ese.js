import React from 'react';
import SlideImage from './SlideImage';
import man from '../static/pngs/robb.png';

function Ese(props){

return(
        <div className="ese-wrapper">
         <h2>Tell us as much as you can.</h2>
         <textarea className="ese-text" value={props.text} onChange={props.handleInput}></textarea>
        </div>
)
}

export default Ese;