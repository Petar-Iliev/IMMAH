import React,{useState} from 'react';
import Rating from './Rating';
import Files from './Files';
function CompanyBody({rating,author,text,links}){

    const [openFile,setOpenFile] = useState(false);

    return(
        <div className="post-body-root">
        <div className="post-left-nav">
            LEFT
           <Rating rating={rating}/>
           <div className="open-files" onClick={()=>setOpenFile(true)}>
               FILES
           </div>
           {openFile && <Files  close={()=>setOpenFile(false)} links={links}/>}
         
        </div>
        <div className="ese-text-wrapper">
            <h3>{author}</h3>
            <pre>
                {text}
            </pre>
        </div>
        </div>
    )

}

export default CompanyBody