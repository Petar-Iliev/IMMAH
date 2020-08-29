import React, { useRef, useState } from 'react';

import defaultImg from '../../static/pngs/door.png';


function File({ url }) {

    const videoRef = useRef();
    const [modal, setModal] = useState(false);

    function playPause() {

        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }

    function handleModal() {
        setModal(!modal);
    }

    let type = url.startsWith('http://res.cloudinary.com/twisteddd/video/upload/') ? 'video' : 'image';
    const source = type === 'image' ? url : defaultImg;
    return (

        <>
            <div className="file-item" onClick={handleModal}>
                <img src={source} />
            </div>
            {modal &&
                <div className="modal-root">

                    <div className='close-btn' onClick={handleModal}></div>

                    {type === 'video' ?
                        <div className="modal" onClick={playPause}>

                            <video ref={videoRef} src={url}></video>
                        </div> :
                        <div className="modal">
                            <img className='content' src={source} />
                        </div>
                    }
                </div>
            }
        </>


    )


}

export default File;



// if(videoReg.test(url)){
//     return(

//         <div className="file-item"  onClick={playPause}>
//           <img src={defaultImg}/>
//         <video ref={videoRef} src={url}></video>
//         </div>
//     )
// }else if(imageReg.test(url)){
//     return(
//         <>
//         <div className="file-item" onClick={handleModal}>
//         <img src={url}/>  
//         </div>
//         <div className="modal-root">
//             <div className="modal">
//                 <img src={url}/>
//             </div>
//         </div>
//         </>
//     )
// }else{
//   return(
//       <span>INVALID FILE</span>
//   )
// }