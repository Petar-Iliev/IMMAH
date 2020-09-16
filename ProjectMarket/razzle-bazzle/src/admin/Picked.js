import React, { useState, useRef } from 'react';
import ShowInfo from './ShowInfo';



function Picked({company,links,author_message,admin_info,id,open,chooseAction}){

    console.log(company);

    const [showInfo,setShowInfo] = useState(false);
    const [showAdminInfo,setAdminInfo] = useState(false);
    const [files,setFiles] = useState([]);
    const [adminComment,setAdminComment] = useState('');
    const [showComments,setShowComments] = useState(false);
    const [adminComments,setAdminComments] = useState(admin_info.comments);
    const [logo,setLogo] = useState([]);
    
    const logoRef = useRef();
    const fileRef = useRef();

    function handleFiles(){
        setFiles(fileRef.current.files);
    }
    function handleLogo(){
        setLogo(logoRef.current.files);
  
    }

    function selectFiles(){
        fileRef.current.click();
    }
    function selectLogo(){
        logoRef.current.click();
    }

 
   async function submit(){


         if(files.length>0){
            Object.keys(files).forEach(async e=>{
                await uploadFile(files[e],'file');
             })
         }

         if(logo.length>0){
         Object.keys(logo).forEach(async e=>{
             await uploadFile(logo[e],'logo');
         })
        }
    }


    async function uploadFile(file,path) {
        const formData = new FormData();
        formData.append("file", file);
        await fetch(`http://localhost:8000/post/admin/upload/${path}?id=${id}`, {
            method: "PATCH",
            body: formData
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                // window.location.reload(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleComment(e){
        setAdminComment(e.target.value);
    }

    async function comment(){

        await fetch(`http://localhost:8000/post/admin/comment?id=${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({adminComment})
        }).then(resp=>{
            if(resp.status === 200){
              let comments = adminComments;
              comments.push(adminComment);
              setAdminComments(comments);
            }
        })
    }

    return(
        <>
        <div className="pick">
           <h3 onClick={()=>setShowInfo(true)}>Author: {company.name}</h3>
           <h3 onClick={()=>setAdminInfo(true)}>ADMIN FILES</h3>
           <input type="file" multiple className="hideme" ref={fileRef} onChange={handleFiles}/>
           <input type="file" className="hideme" ref={logoRef} onChange={handleLogo}/>


     {showAdminInfo &&
       <div className="show-info-pick">
       <div className='pick-info-container'>
       <div className='close-btn' onClick={()=>setAdminInfo(false)}></div>
       Links
     {admin_info.links.map((link,index)=><a key={index} href={link}>{link}</a>)}
       <div className="admin-comment">
          <span>Comment</span>
           <textarea value={adminComment} onChange={handleComment}></textarea>
           <span onClick={comment}>SEND</span>
       
    </div>
       <div className='comments'>
     {adminComments.map((c,index)=><div className='comment'>{c.message}</div>)}

       </div>
     
       <div className="files-holder" onClick={selectFiles}>Selected Files {files.length} </div>
       <div className='select-comp-logo' onClick={selectLogo}>Upload company logo</div>
       <div className='admin-submit' onClick={submit}>Submit</div>
           </div>
           </div>
     }

     {showInfo &&
     <ShowInfo company={company} links={links} author_message={author_message} close={()=>setShowInfo(false)}/>
      }

      <div className='pick-buttons-wrapper'>
      <div className="pick-button delete-me" onClick={()=>{
              chooseAction({number:0,id:id})
              open(true);
      }}>DELETE</div>
      <div className="pick-button voting-me" onClick={()=>{
            chooseAction({number:1,id:id})
            open(true);
      }} >PUBLISH</div>
      </div>
      </div>
        </>
    )
}

export default Picked;