import React, { Component } from 'react';

import Notes from '../../container/Notes/Notes';

class Home extends Component {
  componentDidMount () {
    
  }

  render () {
    return (
      <React.Fragment>
        <Notes />
      </React.Fragment>
    )
  }
  
}

export default Home;