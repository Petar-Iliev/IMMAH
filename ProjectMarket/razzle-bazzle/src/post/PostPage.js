import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import '../static/css/post-page.css';
import Post from './Post';
import PostThumbNail from './PostThumbNail';
function PostPage(){


    
    const [page,setPage] = useState(0);
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
       async function fetchPosts(){
             await fetch(`http://localhost:8000/post?page=${page}`)
            .then(resp=>resp.json())
            .then(data=>{
               setPosts(data);
            })
            .catch(err=>{
                console.log(err);
            });
          
        }
        fetchPosts();
    },[page])



    return(
        <div className="post-page-root">
            <div className="create-post">
             <Link to="/create/post">Create Post</Link>
            </div>
            <div className="thumb-nail-wrapper">
                {posts.map((post,index)=><PostThumbNail key={index} companyName={post.company.name} rating={post.rating} post_id = {post._id} />)}
            </div>
            {/* <div className="posts-container">
                <Post/>
            </div> */}
    <div  onClick={()=>setPage(page+1)}>Clock Me {page}</div>
        </div>
    )
}


export default PostPage;