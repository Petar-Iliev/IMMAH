import React from 'react';


function ShowInfo({company,links,author_message,close}){
    
    return(
        <div className="show-info-pick">
        <div className='pick-info-container'>
        <div className='close-btn' onClick={close}></div>
               <div>
 <a href={company.link}>{company.name}</a>
               </div>
            Links
            <div className='pick-info-links'>
                {links.map((link,index)=><a key={index} href={link} target='_blank'>{link}</a>)}
            </div>
            <pre>
            {author_message}
            </pre>
        </div>
    </div>
    )
}

export default ShowInfo