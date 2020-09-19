import React, { useState, useContext } from 'react';
import Carousel from 'react-elastic-carousel';

import SlideImage from './SlideImage';
import CompanyInfo from './CompanyInfo';
import Ese from './Ese';
import Rating from './Rating';
import Files from './Files';
import SubmitPost from './SubmitPost';



import '../static/css/create-post.css'
import man from '../static/pngs/cherry-56.png';
import robb from '../static/pngs/robb.png';
import AuthContext from '../context/AuthContext';



const imageSlides = [
    <SlideImage pic={man} />,
    <SlideImage pic={robb} />,
    <SlideImage pic={man} />,
    <SlideImage pic={robb} />,
    <SlideImage pic={man} />
]


function CreatePost() {


    const [companyName, setCompanyName] = useState('');
    const [companyLink, setCompanyLink] = useState('');
    const [ese, setEse] = useState('');
    const [slideIndex, setSlideIndex] = useState(0);
    const [selectedRating, setSelectedRating] = useState(-1);
    const [files, setFiles] = useState([]);

    const {user} = useContext(AuthContext);



    async function submitPost() {

        const username = user ? user.username : "anonymous";
        const data = {
            companyName,
            companyLink,
            ese,
            rating: selectedRating+1,
            username
        }
       const respData = await uploadInfo(data);

       const postId = respData._id;
       Object.keys(files).forEach(async e=>{
          await uploadFile(files[e],postId);
       })
    }

    async function uploadInfo(data){

       return await fetch("http://localhost:8000/post/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(resp=>resp.json())
          .catch(err=>console.error(err));
    }

    async function uploadFile(file,id) {
        const formData = new FormData();

       
        formData.append("file", file);

        await fetch(`http://localhost:8000/post/create/file?id=${id}`, {
            method: "POST",
            body: formData
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });



    }

    function handleRating(index) {
        setSelectedRating(index);
    }

    function handleEse(e) {
        setEse(e.target.value);
    }

    function handleCompanyName(e) {
        setCompanyName(e.target.value);
    }
    function handleCompanyLink(e) {
        setCompanyLink(e.target.value);
    }

    function handlePoint(index) {
        setSlideIndex(index);
    }

    function handleFiles(files) {

        setFiles(files);
    }


    const slides = [
        <CompanyInfo companyName={companyName} companyLink={companyLink} handleCompanyName={handleCompanyName} handleCompanyLink={handleCompanyLink} />,
        <Ese text={ese} handleInput={handleEse} />,
        <Files files={files} handleFiles={handleFiles} />,
        <Rating selected={selectedRating} handleRating={handleRating} />,
        <SubmitPost
            submit={submitPost}
            files={files}
            companyName={companyName}
            companyLink={companyLink}
            ese={ese}
            rate={selectedRating}
        />
    ]



    const points = [];

    slides.forEach((e, i) => {
        if (i === slideIndex) {
            points.push(<div key={i} onClick={() => handlePoint(i)} className="nav-point selected-point"></div>);
        } else {
            points.push(<div key={i} onClick={() => handlePoint(i)} className="nav-point"></div>);
        }
    })

    return (
        <div className="home">
            <div className="create-post-root">
                <div className="split left">
                    {slides[slideIndex]}
                </div>
                {imageSlides[slideIndex]}
                <div className="navigation-points">
                    {points}
                </div>

            </div>

        </div>
    )
}

export default CreatePost;

