import React from 'react';

import { HashRouter, Route} from 'react-router-dom';

import Register from '../container/Register/Register';
import Login from '../container/Login/Login';

import Home from '../component/Home/Home';
import Note from '../container/Notes/NotePage.js';

import NavBar from '../container/NavBar/NavBar';


function Layout () {
  return (
    <HashRouter>
      <NavBar />
      
      <Route path='/' exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/note/:id" exact component={Note} />
    </HashRouter>
  );
};

export default Layout;