import React, { useState } from 'react';
import '../static/css/register.css';

function Register() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassord] = useState('');

    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }
    function handleRepeatPassword(e) {
        setRepeatPassord(e.target.value)
    }

   async function handleSubmit() {
       if(username.trim().length < 1 || password.trim().length < 6 || password.trim() !== repeatPassword){
            alert("Invalid props");
       }else{
         const data= await fetch('http://localhost:8000/user/register',{
               method:"POST",
               headers:{
                   'Content-Type':'application/json'
               },
               body:JSON.stringify({
                   username,
                   password
               })
           })
           .then(res=>res.json())
           .catch(err=>{
               console.error(err);
           })

  
       }
    }


    return (
        <div className="register-root">
            <div className="user-pair">
                <label>Username</label>
                <input value={username} onChange={handleUsername} type="text" />
            </div>
            <div className="user-pair">
                <label>Password</label>
                <input value={password} onChange={handlePassword} type="password" />
            </div>
            <div className="user-pair">
                <label>Repeat password</label>
                <input value={repeatPassword} onChange={handleRepeatPassword} type="password" />
            </div>
            <div className="submit-register" onClick={handleSubmit}>Submit</div>
          
        </div>
    )

}

export default Register;