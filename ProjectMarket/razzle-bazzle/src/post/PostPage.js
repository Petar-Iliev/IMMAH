import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import '../static/css/post-page.css';
import Post from './Post';
import PostThumbNail from './PostThumbNail';
function PostPage(){
    
    const [page,setPage] = useState(0);
    const [posts,setPosts] = useState([]);
    const [postsCount,setPostsCount] = useState(0);
    const [postsPerPage,setPostsPerPage] = useState(6);

   console.log(postsCount);

    useEffect(()=>{
       async function fetchPosts(){
             await fetch(`http://localhost:8000/post?page=${page}`)
            .then(resp=>resp.json())
            .then(data=>{
                console.log(data);
               setPosts(data);
            })
            .catch(err=>{
                console.log(err);
            });
            
            await fetch(`http://localhost:8000/post/find/count`)
            .then(resp=>resp.json())
            .then(data=>{

                setPostsCount(data);
            }).catch(err=>console.log(err));
        }
        fetchPosts();
    },[page])



    return(
        <div className="post-page-root">
            <div className="create-post">
             <Link to="/create/post">Create Post</Link>
            </div>
            <div className='votings-post-link'>
                <Link to='/voting/posts'>VOTING</Link>
            </div>
            <div className="thumb-nail-wrapper">
                {posts.map((post,index)=><PostThumbNail username={post.author.username} logo={post.company.logo} key={index} companyName={post.company.name} rating={post.rating} post_id = {post._id} />)}
            </div>
            {/* <div className="posts-container">
                <Post/>
            </div> */}
            <div className='arrows-holder'>
           
    {page>0 &&
    <div  className='pagination-arrow' onClick={()=>setPage(page-1)}>&larr;</div>
}
{page < postsCount &&
    <div className='pagination-arrow' onClick={()=>setPage(page+1)}>&rarr;</div>}
            </div>
          
        </div>
    )
}


export default PostPage;