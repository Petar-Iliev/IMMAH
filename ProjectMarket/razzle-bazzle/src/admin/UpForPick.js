import React, { useState, useEffect } from 'react';
import Pick from './Pick';
import Confirm from './Confirm';

function UpForPick() {

    const [picks, setPicks] = useState([]);

    const [areYouSure,setAreYouSure] = useState(false);
    const [action,setAction] = useState(null);
 

    const actions=[
        makePostVotable,
        deletePost,
        pickupPost
    ]

  async function pickupPost(){
       await fetch(`http://localhost:8000/post/pickup?id=${action.id}`,{
            method:"PATCH"
        })
        .then(resp=>resp.json())
        .then(data=>{
           if(data.msg){
                const pickArr = picks.filter(pick=>pick._id !== action.id);
                setPicks(pickArr);
           }
        })
    }

   async function deletePost(){
      await fetch(`http://localhost:8000/post/delete?id=${action.id}`,{
            method:"DELETE"
        })
        .then(resp=>resp.json())
        .then(data=>{
           if(data.msg){
                const pickArr = picks.filter(pick=>pick._id !== action.id);
                setPicks(pickArr);
           }
        })
    }

   async function makePostVotable(){
        await fetch(`http://localhost:8000/post/voting?id=${action.id}`,{
            method:"PATCH"
        })
        .then(resp=>resp.json())
        .then(data=>{
           if(data.msg){
                const pickArr = picks.filter(pick=>pick._id !== action.id);
                setPicks(pickArr);
           }
        })
    }
  

    useEffect(() => {

        async function fetchData() {
         await fetch('http://localhost:8000/post/get/pending')
          .then(resp=>resp.json())
          .then(data=>{
              console.log(data);
              setPicks(data);
          })
        }

        fetchData();

    }, []);

    return (
        <div className='home'>
            <div className='pick-post-root'>
             
                {picks.length <1 ?
                 <h1>NO POSTS FOR PICKING</h1>
                :
               picks.map((pick,index)=> <Pick open={setAreYouSure} chooseAction={setAction} key={index} id={pick._id} author_message={pick.author_message} links={pick.links} rating={pick.rating} company={pick.company}/>)
                }
            </div>
            {areYouSure && <Confirm close={()=>setAreYouSure(false)} next={actions[action.number]}/>}
        </div>
    )
}

export default UpForPick;