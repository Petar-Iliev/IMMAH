import React, { useState, useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom'
import '../static/css/post.css';
import {Redirect} from 'react-router-dom'

import CompanyHeader from './fragments/CompanyHeader';
import CompanyBody from './fragments/CompanyBody';
import CompanyFooter from './fragments/CompanyFooter';
import AuthContext from '../context/AuthContext';

function Post(){

    let {id} = useParams();

    const [post,setPost] = useState(undefined);
    const [mustLog,setMustLog] = useState(false);
    const {user} = useContext(AuthContext);
    const [redirect,setRedirect] = useState(false);

    
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


    async function comment(message){
        const username = user!==null ? user.username : 'anonymous';

        const data={
            message,
            username
        }
      await fetch(`http://localhost:8000/post/comment?postId=${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },    
            body:JSON.stringify(data)
        })
        .then(resp=>resp.json())
        .then(data=>{
           
            setPost(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    async function vote(type){
        console.log(type);
        if(!user){
            setMustLog(true);
        }else{

            await fetch(`http://localhost:8000/post/vote?id=${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify({vote:type,username:user.username})
            })
            .then(resp=>{
                console.log(resp);
                if(resp.status === 200){
                 setRedirect(true);
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }

    if(redirect){
        return <Redirect to='/'/>
    }

    return(
        <>
        {post!=undefined &&
            <div className="post-page-root">
             <CompanyHeader name={post.company.name} link = {post.company.link} created_on={post.create_on}/>
             <CompanyBody author={post.author.username} text={post.author_message}  adminLinks={post.admin_info.links} rating={post.rating} links={post.links}/>
             <CompanyFooter mustLog={mustLog} vote={vote} submitComment={comment} adminComments={post.admin_info.comments}  user={user} comments={post.comments} voting={post.voting}/>

        </div>
        }
       </>
    )
}

export default Post;