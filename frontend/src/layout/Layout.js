import React from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';

import Register from '../container/Register/Register';
import Login from '../container/Login/Login';

import Home from '../component/Home/Home';

import CreateNote from '../container/Notes/CreateNote/CreateNote';
import Note from '../container/Notes/NotePage.js';

import NavBar from '../container/NavBar/NavBar';


function Layout () {
  return (
    <HashRouter>
      <NavBar />
      
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />

        <Route path='/note/create' exact component={CreateNote} />
        <Route path="/note/:id" exact component={Note} />
      </Switch>
    </HashRouter>
  );
};

export default Layout;