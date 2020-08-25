import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Header from './Header';
import Story from './Story';
import PostPage from './post/PostPage';
import CreatePost from './post/CreatePost';
import {Counter} from './Counter';

const App = () => (
  <>
  <Header/>
  <Switch>
    <Route path="/counter" component={Counter}/>
    <Route exact path="/" component={Home} />
    <Route path="/story" component={Story}></Route>
    <Route path="/posts" component={PostPage}></Route>
    <Route path="/create/post" component={CreatePost}></Route>
  </Switch>
  </>
);

export default App;

