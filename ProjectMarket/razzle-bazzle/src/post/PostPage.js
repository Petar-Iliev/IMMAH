import React from 'react';
import {Link} from 'react-router-dom'
import '../static/css/post-page.css';

function PostPage(){

    return(
        <div className="post-page-root">
            <div className="create-post">
             <Link to="/create/post">Create Post</Link>
            </div>
        </div>
    )
}


export default PostPage;