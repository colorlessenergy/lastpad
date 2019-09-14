import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { userIsLogin, logoutUser } from '../../store/actions/';

class NavBar extends Component {

  componentDidMount = () => {
    this.props.userIsLogin();
  }

  logoutUser = () => {
    this.props.logoutUser();

    return <Redirect to='/login' />
  }

  render () {
   
    // if the user is logged in
    // show create and logout
    // if user is not logged in
    // show register and login
    const links = this.props.isUserLogin ? (
      <div>
        <Link to='/create'>create</Link>
        <Link to='/'>lastpad</Link>
        <p onClick={this.logoutUser}>logout</p>
      </div>
      ) : (
      <div>
        <Link to='/register'>register</Link>
        <Link to='/'>lastpad</Link>
        <Link to='/login'>login</Link>
      </div>
      );

    return (
      <React.Fragment>
        { links }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isUserLogin: state.auth.userIsLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userIsLogin: () => {
      dispatch(userIsLogin());
    },

    logoutUser: () => {
      dispatch(logoutUser());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));