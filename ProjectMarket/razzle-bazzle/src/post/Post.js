import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import '../static/css/post.css';

import CompanyHeader from './fragments/CompanyHeader';
import CompanyBody from './fragments/CompanyBody';

function Post(props){

    let {id} = useParams();

    const [post,setPost] = useState(undefined);

    console.log(id);
    useEffect(()=>{

       async function fetchPost(){
           await fetch(`http://localhost:8000/post/find?id=${id}`)
           .then(resp=>resp.json())
           .then(data=>{
              console.log(data);
              setPost(data);
           }).catch(err=>console.log(err));
        }
        fetchPost();
    },[])

    return(
        <>
        {post!=undefined &&
            <div className="post-page-root">
             <CompanyHeader name={post.company.name} link = {post.company.link} created_on={post.create_on}/>
             <CompanyBody author={post.author.username} text={post.author_message} rating={post.rating} links={post.links}/>

        </div>
        }
       </>
    )
}

export default Post;