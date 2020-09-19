import React, {useState, useContext} from 'react';
import '../static/css/register.css';
import AuthContext from '../context/AuthContext';
import Loader from '../Loader';
import { Redirect } from 'react-router-dom';

function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [load,setLoad] = useState(false);
    const [userValid,setUserValid] = useState(false);
    const {user,setUser} = useContext(AuthContext);

    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

   async function handleSubmit(e){


    e.preventDefault();
    setLoad(true);
      await fetch('http://localhost:8000/user/login',
       {
           method:"POST",
         
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({username,password})
       }
       )
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data);
           if(!data.err){
            setUser(data);
           }else{
               setUserValid(true);
               setLoad(false);
           }
           
        })
        .catch(err=>{
            console.log(err);
        })

       
      
    }


    if(user){
        return <Redirect to='/'/>
    }

    return(
        <>
        {load && <Loader/>}
        <div className='home'>
         
     
            <div className="register-root login-root">
                <div>
                <form onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
           <div className="user-pair">
             <label htmlFor='username'>Username</label>
             <input value={username} name='username' onChange={handleUsername} type="text" />
             { userValid && <span className='validation-error'>Invalid username or password !</span>}
         </div>
         <div className="user-pair"> 
          <label htmlFor='password'>Password</label>
             <input value={password} name='password' onChange={handlePassword} type="password" />
         </div>
       
      <button className="submit-register" type='submit'>Sign In</button>
         </form>
         </div>
      </div>
        </div>
        </>
       )
}

export default Login;