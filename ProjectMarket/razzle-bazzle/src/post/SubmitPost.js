import React from 'react';


function SubmitPost({files,companyName,companyLink,ese,rate,submit}){
   
    const areFiles = files.length > 0;
    const isName = companyName.trim().length > 0;
    const isLink = companyLink.trim().length > 0;
    const isEse =  ese.trim().length > 4;
    const isRate = rate !== -1;

    
    function submitPost(){
         if(validProps()){
             submit();
         }
    }

    function validProps(){
        if(isName && isLink && isEse && isRate){
            return true;
        }
        return false;
    }


    const canSubmit = validProps();

    return(
         <div className="ese-wrapper">
             <h3>POST</h3>
             <div className="post-checkout-checker">
             <ul>
    <li>{`Company Name ${!isName ? 'NO' :'YES'}`}</li>
    <li>{`Company Link ${!isLink ? 'NO' :'YES'}`}</li>
    <li>{`Files ${!areFiles ? 'NO' :'YES'}`}</li>
    <li>{`Text ${!isEse ? 'NO' :'YES'}`}</li>
    <li>{`Rate ${!isRate ? 'NO' :'YES'}`}</li>
             </ul>
             </div>
             <div onClick={submitPost} className={`submit-post ${canSubmit ? 'able' : 'unable'}`}>
                 SUBMIT
             </div>
         </div>
    )
}

export default SubmitPost;