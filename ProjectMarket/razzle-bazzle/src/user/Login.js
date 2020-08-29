import React, {useState, useContext} from 'react';
import '../static/css/register.css';
import AuthContext from '../context/AuthContext';


function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {user,setUser} = useContext(AuthContext);

    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

   async function handleSubmit(){
 
      const data = await fetch('http://localhost:8000/user/login',
       {
           method:"POST",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({username,password})
       }
       )
        .then(resp=>resp.json())
        .catch(err=>{
            console.log(err);
        })

       
         data.username ? setUser({data}) : alert(data.err);  
    }


    return(
        <div>
      <div className="register-root">
            <div className="user-pair">
                <label>Username</label>
                <input value={username} onChange={handleUsername} type="text" />
            </div>
            <div className="user-pair">
                <label>Password</label>
                <input value={password} onChange={handlePassword} type="password" />
            </div>
          
            <div className="submit-register" onClick={handleSubmit}>LOGIN</div>
        
        </div>
        </div>
    )
}

export default Login;