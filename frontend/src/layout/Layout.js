import React from 'react';

import { BrowserRouter, 
          Route} from 'react-router-dom';


import Register from '../container/Register/Register';
import Login from '../container/Login/Login';

function Layout () {
  return (
    <BrowserRouter>
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
    </BrowserRouter>
  )
};

export default Layout