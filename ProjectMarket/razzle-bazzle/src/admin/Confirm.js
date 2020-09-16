import React from 'react';


function Confirm({next,close}){

    function handleNext(){
        next();
        close();
    }

    return(
        <div className='confirm-root'>
        <div className="confirm-action">
            <h2>Are you sure ?</h2>
            <div className="confirm-buttons-holder">
            <div className="voting-me" onClick={close}>NO</div>
            <div className="pick-me" onClick={handleNext}>YES</div>
            </div>
           
        </div>
        </div>
    )
}

export default Confirm;