import React, { useState, useEffect, useContext } from 'react';
import PostThumbNail from './PostThumbNail';
import AuthContext from '../context/AuthContext';

function VotingPostsPage(){

    const [posts,setPosts] = useState([]);
    let {user} = useContext(AuthContext);

    console.log("USERR "+user);


    useEffect(()=>{
        const username = user ? user.username : 'anonymous';
        async function fetchPosts(){
              await fetch(`http://localhost:8000/post/find/votable?user=${username}`)
             .then(resp=>resp.json())
             .then(data=>{
                setPosts(data);
             })
             .catch(err=>{
                 console.log(err);
             });
           
         }
         fetchPosts();
     },[])

     return(
         <div className='post-page-root'>

         <div className="thumb-nail-wrapper">
                {posts.map((post,index)=><PostThumbNail key={index} companyName={post.company.name} rating={post.rating} post_id = {post._id} />)}
            </div>
         </div>
     )
}

export default VotingPostsPage;