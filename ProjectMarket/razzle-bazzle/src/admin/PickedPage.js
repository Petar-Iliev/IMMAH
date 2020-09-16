import React, { useState, useEffect } from 'react';
import Picked from './Picked';
import Confirm from './Confirm';

function PickedPage(){

    const [posts,setPosts] = useState([]);
    const [action,setAction] = useState(null);
    const [areYouSure,setAreYouSure] = useState(false);

    const actions=[
        deletePost,
        publishPost
    ]

    useEffect(()=>{

       async function fetchData(){
          await fetch(`http://localhost:8000/post/get/picked`)
          .then(resp=>resp.json())
          .then(data=>{
              setPosts(data);
          })
        }
        fetchData();
    },[])

    async function deletePost(){
     
        await fetch(`http://localhost:8000/post/delete?id=${action.id}`,{
              method:"DELETE"
          })
          .then(resp=>resp.json())
          .then(data=>{
             if(data.msg){
                  const pickArr = posts.filter(pick=>pick._id !== action.id);
                  setPosts(pickArr);
             }
          })
      }

      async function publishPost(){
        
        await fetch(`http://localhost:8000/post/admin/publish/post?id=${action.id}`,{
              method:"PATCH"
          })
          .then(resp=>resp.json())
          .then(data=>{
             if(data.msg){
                  const pickArr = posts.filter(pick=>pick._id !== action.id);
                  setPosts(pickArr);
             }
          })
      }


    return(
        <div className='home'>
            PiCked
    {posts.map((post,index)=><Picked key={index}  open={setAreYouSure} chooseAction={setAction}  id={post._id} admin_info={post.admin_info} company={post.company} links={post.links} author_message={post.author_message}/>)}
    {areYouSure && <Confirm close={()=>setAreYouSure(false)} next={actions[action.number]}/>}
       </div>
    )
}

export default PickedPage;