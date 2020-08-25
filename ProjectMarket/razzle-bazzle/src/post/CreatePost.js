import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';

import SlideImage from './SlideImage';
import CompanyInfo from './CompanyInfo';
import Ese from './Ese';
import Rating from './Rating';
import Files from './Files';



import '../static/css/create-post.css'
import man from '../static/pngs/cherry-56.png';
import robb from '../static/pngs/robb.png';



function CreatePost(){

   
    const [companyName,setCompanyName] = useState('');
    const [companyLink,setCompanyLink] = useState('');
    const [ese,setEse] = useState('');
    const [slideIndex,setSlideIndex] = useState(0);
    const [selectedRating,setSelectedRating] = useState(-1);


    function handleRating(index){
        setSelectedRating(index);
    }

    function handleEse(e){
         setEse(e.target.value);
    }

    function handleCompanyName(e){
        setCompanyName(e.target.value);
    }
    function handleCompanyLink(e){
        setCompanyLink(e.target.value);
    }

    function handlePoint(index){
         setSlideIndex(index);
    }

    const slides = [
        <CompanyInfo companyName={companyName} companyLink={companyLink} handleCompanyName={handleCompanyName} handleCompanyLink={handleCompanyLink}/>,
        <Ese text={ese} handleInput={handleEse}/>,
        <Rating selected={selectedRating} handleRating={handleRating}/>,
        <Files/>
        ]
    
        const imageSlides =[
            <SlideImage pic={man}/>,
            <SlideImage pic={robb}/>,
            <SlideImage pic={man}/>,
            <SlideImage pic={robb}/>
        ]


    const points=[];

    slides.forEach((e,i)=>{
        if(i === slideIndex){
            points.push(<div key={i} onClick={()=>handlePoint(i)} className="nav-point selected-point"></div>);
        }else{
            points.push(<div key={i} onClick={()=>handlePoint(i)}  className="nav-point"></div>);
        }
    })

    return(
        <div className="home">
       <div className="create-post-root">
       <div className="split left">
           {slides[slideIndex]}
           </div>
           {imageSlides[slideIndex]}
           <div className="navigation-points">
            {points}
             </div>
           
       </div>
      
       </div>
    )
}

export default CreatePost;

