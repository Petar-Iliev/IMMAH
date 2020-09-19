import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../static/css/register.css';

function Register() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassord] = useState('');

    const [usernameVal,setUsernameVal] = useState(false);
    const [usernameExVal,setUsernameExVal] = useState(false);
    const [passVal,setPassVal] = useState(false);
    const [repPassVal,setRepPassVal] = useState(false);

    const [redirect,setRedirect] = useState(false);



    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }
    function handleRepeatPassword(e) {
        setRepeatPassord(e.target.value)
    }


    function validateProps(){
        
        let isValid=true;

        if(  username.trim().length < 1 ){
            setUsernameVal(true);
            isValid=false;
        }else{
            setUsernameVal(false);
        }

        if(  password.trim().length < 6){
            setPassVal(true);
            isValid=false;
        }else{
            setPassVal(false);
        }

        if( password.trim() !== repeatPassword){
            setRepPassVal(true);
            isValid=false;
        }else{
            setRepPassVal(false);
        }

       
        console.log(isValid);

        return isValid

    }

   async function handleSubmit(e) {
       e.preventDefault();
       console.log("SUB");


  

       console.log(username,password);


       if(validateProps()){
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

           if(data.err){
               setUsernameExVal(true);
           }else{
               setRedirect(true);
           }
       }
    }

    if(redirect){
        return <Redirect to='/login'/>
    }

    return(
        
     <div className='home'>
         <div className="register-root">
             <div>
             <form onSubmit={handleSubmit}>
                 <h2>Sign Up</h2>
        <div className="user-pair">
          <label htmlFor='username'>Username</label>
          <input value={username} name='username' onChange={handleUsername} type="text" />
          {usernameVal && <span className='validation-error'>Username must be atleast 1 character !</span>
          }
         {usernameExVal && <span className='validation-error'>Username already exist !</span>}
        
      </div>
      <div className="user-pair"> 
       <label htmlFor='password'>Password</label>
          <input value={password} name='password' onChange={handlePassword} type="password" />
          {passVal && <span className='validation-error'>Password must be atleast 6 characters !</span>}
      </div>
     <div className="user-pair">
          <label htmlFor='repeat-password'>Confirm password</label>
        <input value={repeatPassword} name='repeat-password' onChange={handleRepeatPassword} type="password" />
        {repPassVal && <span className='validation-error'>Password does not match !</span>}
    </div>
   <button className="submit-register" type='submit'>Createa an Account</button>
      </form>
      </div>
   </div>
     </div>
    )

    

}

export default Register;







// return (
//     <div className="register-root">
//         <div className="user-pair">
//             <label>Username</label>
//             <input value={username} onChange={handleUsername} type="text" />
//         </div>
//         <div className="user-pair">
//             <label>Password</label>
//             <input value={password} onChange={handlePassword} type="password" />
//         </div>
//         <div className="user-pair">
//             <label>Repeat password</label>
//             <input value={repeatPassword} onChange={handleRepeatPassword} type="password" />
//         </div>
//         <div className="submit-register" onClick={handleSubmit}>Submit</div>
      
//     </div>
// )