import React from 'react';


function CompanyHeader({name,link,created_on}){

    let date = new Date(created_on);
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let day = date.getDate();
    

    return(
        <div className="comapny-header">
            <h1>{name}</h1>
            <a href={link} target="_blank">WEBSITE</a>
    <h4>POSTED ON : {`${day} / ${month} / ${year}`} </h4>
        </div>
    )
}

export default CompanyHeader;