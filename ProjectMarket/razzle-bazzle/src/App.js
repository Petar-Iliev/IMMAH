import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Header from './Header';
import Story from './Story';
import PostPage from './post/PostPage';
import CreatePost from './post/CreatePost';
import Post from './post/Post';

import Register from './user/Register';
import Login from './user/Login';
import {Counter} from './Counter';


import AuthContext from './context/AuthContext';

function App(){
  
  const [user,setUser] = useState(null);

 
  return(
  <>
   <AuthContext.Provider value={{user,setUser}}>
  <Header/>
  <Switch>
    <Route path="/counter" component={Counter}/>
    <Route exact path="/" component={Home} />
    <Route path="/story" component={Story}></Route>
    <Route exact path="/posts" component={PostPage}></Route>
    <Route path="/create/post" component={CreatePost}></Route>
    <Route path='/register' component={Register}></Route>
    <Route path="/login" component={Login}></Route>
    <Route path="/post/:id" component={Post}/>
  
  </Switch>
  </AuthContext.Provider>
  </>
  )
  }

export default App;

