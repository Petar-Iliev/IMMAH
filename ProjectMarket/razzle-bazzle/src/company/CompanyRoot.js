import React, { useState, useEffect } from 'react';
import CompanyThumbNail from './CompanyThumbNail';
import '../static/css/company.css';

function CompanyRoot(){

    const [companies,setCompanies] = useState([]);

    useEffect(()=>{

       async function fetchData(){
          
        fetch(`http://localhost:8000/company`)
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data);
            setCompanies(data);
        }).catch(err=>{
            console.error(err);
        })
        }
        fetchData();
    },[])


    return(
        <div className='home'>
            <div className='companies-nail-container'>
                {companies.map((company,index)=><CompanyThumbNail logo={company.logo} name={company.name} rating={company.rating} id={company._id} posts={company.posts} key={index}/>)}
            </div>
        </div>
    )
}

export default CompanyRoot;