import React, { useEffect } from 'react';
import File from './File';
const imageReg = /http:\/\/res\.cloudinary\.com\/twisteddd\/image.*/g

function Files({links,close}){
   

    function handleModal(){
      
        close();
    }

    return(
        <div className="post-files-wrapper">
              <div className='close-btn top-right' onClick={handleModal}></div>
     
            {links.map((link,index)=><File key={index} url={link}/>)}
            {links.map((link,index)=><File key={index} url={link}/>)}
        </div>
    )
}

export default Files;