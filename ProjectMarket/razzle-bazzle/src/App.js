import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import './Home.css';
import Header from './Header';
import Story from './Story';
import PostPage from './post/PostPage';
import CreatePost from './post/CreatePost';
import Post from './post/Post';

import Admin from './admin/Admin';
import UpForPick from './admin/UpForPick';
import PickedPage from './admin/PickedPage';
import VotingPostsPage from './post/VotingPostsPage';

import CompanyRoot from './company/CompanyRoot';
import CompanyPage from './company/CompanyPage';

import Register from './user/Register';
import Login from './user/Login';

import {Counter} from './Counter';

import Home from './home/Home';
import Footer from './home/Footer'

import AuthContext from './context/AuthContext';

import Contact from './Contact';

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
    <Route exact path='/admin' component={Admin}/>
    <Route path='/admin/up-for-picks' component={UpForPick}/>
    <Route path='/admin/picked' component={PickedPage}/>
    <Route path='/voting/posts' component={VotingPostsPage}/>
    <Route path='/companies' component={CompanyRoot}/>
    <Route path='/company/:id' component={CompanyPage}/>
    <Route path='/contact' component={Contact}/>

  </Switch>
  <Footer/>
  </AuthContext.Provider>
  </>
  )
  }

export default App;

