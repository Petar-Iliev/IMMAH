import React, { useState } from 'react';

import './static/css/contact.css';

import img from './static/pngs/cherry-message-sent.png';

function Contact(){

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [msg,setMsg] = useState('');

   async function sendEmail(){
      console.log(name,email,msg);

     await fetch(`http://localhost:8000/user/email`,{
          method:"POST",
          headers:{
              "Content-Type":'application/json'
          },
          body:JSON.stringify({name,email,msg})
      }).then(resp=>resp.json())
      .then(data=>{
          console.log(data);
      }).catch(err=>{
          console.log(err);
      })
    }

    return(
       
        <div className='contact-form-holder'>
  <div className='contact-form'>
      <h1>Contact Us</h1>
      <div className='contact-input-block'>
      <input className='input' type='text' name='name' required autoComplete='off' value={name} onChange={(e)=>setName(e.target.value)}/>
            <label htmlFor='name' className='label-name'>
                <span className='content-name'>Name</span>
            </label>
      </div>

      <div className='contact-input-block'>
      <input type='text' className='input' name='email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor='email' className='label-name'>
                <span className='content-name'>Email</span>
            </label>
      </div>
      {/* <div className='contact-input-block'> */}
      <textarea type='week' name='name' rows='7' cols='50' className='input' required autoComplete='off' placeholder='Type here ...' 
      value={msg} onChange={(e)=>setMsg(e.target.value)}
      />
            {/* <label htmlFor='name' className='label-name'>
                <span className='content-name'>TEXT</span>
            </label> */}
      {/* </div> */}

                <div onClick={sendEmail} className="btn btn-3">SEND</div> 
        </div>

        <div className='landingImage contact-img'>
                    <img src={img} alt='man'/>
                </div>
                
        </div>
    
      
     
    )
}

export default Contact