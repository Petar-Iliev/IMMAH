import React, { useState, useRef } from 'react';


function Files(props){

 
    const fileRef = useRef();

    function openSelection(){
        fileRef.current.click();
    }

    function handleFiles(){
     props.handleFiles(fileRef.current.files);
    }

    return(
        <div className="ese-wrapper">
          <h3>Upload files ( chat , audio , video etc. )</h3>
          <div className="files-holder" onClick={openSelection}>
          <span>{`SELECTED FILES - ${props.files.length}`}</span>
              <input type="file" multiple className="hideme" ref={fileRef} onChange={handleFiles}/>
          </div>
        </div>
    )
}

export default Files;