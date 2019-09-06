import React from 'react';

import { HashRouter, Route} from 'react-router-dom';


import Register from '../container/Register/Register';
import Login from '../container/Login/Login';

import Home from '../component/Home/Home';

function Layout () {
  return (
    <HashRouter>
      <Route path='/' exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
    </HashRouter>
  )
};

export default Layout