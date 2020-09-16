import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostThumbNail from '../post/PostThumbNail';
import CompanyCard from './CompanyCard';
import { Line, Doughnut } from 'react-chartjs-2';

import ejis from '../emojis';

let postsToShow=3;

function CompanyPage() {

    const [company, setCompany] = useState(null);
    const [pieRating, setPieRaing] = useState([]);
    const [pageIndex,setPageIndex] = useState(0);

    console.log(ejis);

    let { id } = useParams();

    useEffect(() => {
        let donRat = new Map();

        async function fetchData() {
            fetch(`http://localhost:8000/company/find?id=${id}`)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    data.posts.forEach(post => {
                        if (donRat.has(post.rating)) {
                            donRat.set(post.rating, donRat.get(post.rating) + 1)
                        } else {
                            donRat.set(post.rating, 1);
                        }
                    })

                    let p = [];

                    for (let i = 1; i < 6; i++) {
                        if (donRat.has(i)) {
                            p.push({ num: i, points: donRat.get(i) });
                        } else {
                            p.push({ num: i, points: 0 });
                        }
                    }

                    setPieRaing(p);
                    setCompany(data);

                })
        }
        fetchData();
    }, [])


    if (!company) {
        return (
            <div>
                NOT FOUND
            </div>
        )
    }

    return (
        <div className='home-company'>
            <div className='company-page-root'>
                <div className='company-page-header'>
                    <img src={company.logo} />
                    <h1>{company.name}</h1>
                    <h3>RATING {company.rating / company.posts.length}</h3>
                </div>

                <div className='company-charts'>
                    {/* <Line data={{labels:[1,2,3,4,5]
                  ,datasets:[
                      {label:'User rated',data:[23,5,654,23,5]}
                  ]
                }}/> */}

                    <Doughnut data={{
                        labels: ['1', '2', '3', '4', '5'],
                        datasets: [
                            {
                                label: "RATED",
                                data: pieRating.map(e => e.points),
                                backgroundColor: [
                                    'rgba(152, 95, 111,0.2)',
                                    'rgba(180, 134, 159,0.2)',
                                    'rgba(255,206,86,0.2)',
                                    'rgba(255,206,86,0.2)',
                                ]
                            }
                        ]
                    }} width={300} height={100} />
                </div>

                <section className="card-list">
                    {company.posts.slice(pageIndex*postsToShow,pageIndex*postsToShow+postsToShow).map(e =>
                         <CompanyCard key={e._id} emoji={ejis[e.rating]} id={e._id} author={e.author.username} msg={e.author_message} date={e.create_on} />)}
                 
                </section>
            </div>
            <div className='company-arrows-pagination'>
                {company.posts.length>3 &&
                <>
                <div onClick={()=>{
                    if(pageIndex===0){
                        // setPageIndex(Math.ceil(company.posts.length/postsToShow))
                        setPageIndex(Math.floor(company.posts.length/postsToShow));
                    }else{
                        setPageIndex(pageIndex-1)}
                    }
                  
                    }  className='left-arrow'>LEFT</div>

                <div onClick={()=>{

                    console.log(company.posts.length/(pageIndex+1*postsToShow));

                    if(company.posts.length / (pageIndex+1*postsToShow)<=1){
                        setPageIndex(0);
                    }else{
                        setPageIndex(pageIndex+1)
                    }
                 
                }} className='right-arrow'>RIGHT</div>
                </>
                }

                </div>
        </div>
    )
}

export default CompanyPage;




{/* 
             <div className="thumb-nail-wrapper">
                {company.posts.map((post,index)=><PostThumbNail key={index} companyLogo= {post.company.logo} username={post.author.username} companyName={post.company.name} rating={post.rating} post_id = {post._id} />)}
            </div> */}