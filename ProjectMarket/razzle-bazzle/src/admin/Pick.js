import React, { useState } from 'react';
import ShowInfo from './ShowInfo';

function Pick({author_message,company,links,rating,id,open,chooseAction}){


    const [showInfo,setShowInfo] = useState(false);
    
    return(
        <>
        <div className="pick">
           <h3 onClick={()=>setShowInfo(true)}>{company.name}</h3>
    <span>Rating : {rating}</span>
    <div className="pick-buttons-wrapper">
        <div className="pick-button voting-me" onClick={()=>{
               chooseAction({number:0,id});
               open(true);
        }}>VOTING</div>
        <div className="pick-button delete-me" onClick={()=>{
               chooseAction({number:1,id});
           open(true);
        }}>DELETE</div>
        <div className="pick-button pick-me" onClick={()=>{
                chooseAction({number:2,id});
           open(true);
        }}>PICK UP</div>
    </div>
        </div>

     {showInfo &&
     <ShowInfo company={company} links={links} author_message={author_message} close={()=>setShowInfo(false)}/>
      
      }
        </>
    )
}

export default Pick;