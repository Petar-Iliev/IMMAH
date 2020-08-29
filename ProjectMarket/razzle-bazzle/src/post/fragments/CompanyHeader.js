import React from 'react';


function CompanyHeader({name,link,created_on}){


    return(
        <div className="comapny-header">
            <h1>{name}</h1>
            <a href={link} target="_blank">WEBSITE</a>
    <h4>POSTED ON : {created_on}</h4>
        </div>
    )
}

export default CompanyHeader;