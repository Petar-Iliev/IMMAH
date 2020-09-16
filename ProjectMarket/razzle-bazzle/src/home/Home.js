import React, { useEffect } from 'react';
import '../static/css/test.css';
import man from '../static/pngs/cherry-56.png';
import exp from '../static/svgs/other/character 24.svg';

import Aos from 'aos'
import 'aos/dist/aos.css';

const Home = () =>{


    useEffect(()=>{
      Aos.init({duration:2000,offset:300});
    },[])

    return(
        <>
        <div  data-aos='fade-in' className='landing'>
            <div className='landing-text'>
                <h1>Make The <span>World Safe.</span></h1>
                <h3>Lets work together to put an end to this pandemic.<br/> Help stop the spread.</h3>
                 <div className='lan-btn'>
                    <a href='#'>Learn More</a>
                 </div>
              
             </div>
            <div className='landingImage'>
                    <img src={man} alt='man'/>
                </div>
        </div>
        <div className='about' data-aos='fade-down'>
            <div className='about-text'>
                <h1>Why is it important that <br/> <span>You raise voice.</span></h1>
                <img src={exp}/>
            </div>
            <div className='about-list'>
                <ol>
                    <li>
                        <span>01</span>
                        <p>Every company has something called customer service , which You the customer 
                            face from time to time , they ask for review how they did , improve etc. But it all seems pointless when you realize nothing has changed.
                        </p>
                    </li>
                    <li>
                        <span>02</span>
                        <p>Every time you spread the word the world will hear you. We gonna be the one to make sure they did also.
                        </p>
                    </li>
                    <li>
                        <span>03</span>
                        <p>You are helping us, the company, the people by exposing the truth, by making them hear and by letting us see. If they learn from their mistakes and fix the problem,
                            good, if not, life goes on.  
                        </p>
                    </li>
                    <li>
                        <span>04</span>
                        <p>"We are investigating the case." Ever heard that ? It doesn't mean we gonna call Sherlock Holmes cause this case is special. It means quite a lot of stuff : I don't know what
                            to do gonna ask the boss ( When there's nothing in the copy-paste cheat scheet that can help them they usally ask someone who is more 'competent') ,
                            That guy told me his package didn't arrived and he looks like a scammer , let me call Sherlock Holmes.
                        </p>
                    </li>
                </ol>
            </div>
        </div>
       
     


     
     
        </>
    )
}

export default Home;








    /* <div className='footer'>
            <div className='footer-text'>
                <h1>Download the health APP <br/>
                 <span>Stay updated and get all the medical need to take off.</span>
                 </h1>

              <a href='#'><img src={man}/></a>
              <a href='#'><img src={man}/></a>
            </div>
            <div className='footer-img'>
                <img src={exp}/>
            </div> */