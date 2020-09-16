import React,{useState} from 'react';
import Rating from './Rating';
import Files from './Files';
function CompanyBody({rating,author,text,links,adminLinks}){

    const [openFile,setOpenFile] = useState(false);
    const [openAdminFile,setOpenAdminFile] = useState(false);

    return(
        <div className="post-body-root">
        <div className="post-left-nav">
            
           <Rating rating={rating}/>
           <div className="open-files" >
               {links.length > 0 &&
              <span onClick={()=>setOpenFile(true)}>Author Files</span>
               }
              {adminLinks.length > 0 &&
              <span onClick={()=>setOpenAdminFile(true)}>OUR FILES</span>
              }
              </div>
           {openFile && <Files  close={()=>setOpenFile(false)} links={links}/>}
           {openAdminFile && <Files  close={()=>setOpenAdminFile(false)} links={adminLinks}/>}
         
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