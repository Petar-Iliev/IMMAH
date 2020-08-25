import React from 'react';
import SlideImage from './SlideImage';
import man from '../static/pngs/cherry-56.png';

function CompanyInfo(props){

    return(     
         
            <div className="input-info-cont-wrapper">
                <h2>Provide us the company name and link so we can know :  <br/>- Who we are talking about.<br/>- Who to talk to.<br/>- Where to find them.</h2>
        <label>COMPANY NAME</label>
      <input type="text" onChange={props.handleCompanyName} value={props.companyName}/> 
      <label>COMPANY LINK</label>
      <input type="text" onChange={props.handleCompanyLink} value={props.companyLink}/> 
      </div>
 

    )
}

export default CompanyInfo;