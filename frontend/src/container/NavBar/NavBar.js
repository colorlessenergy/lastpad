import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userIsLogin, logoutUser } from '../../store/actions/';

import classes from './NavBar.module.css';

class NavBar extends Component {

  componentDidMount = () => {
    this.props.userIsLogin();
  }

  logoutUser = () => {
    this.props.logoutUser();

    return this.props.history.push('/login')
  }

  render () {
   
    // if the user is logged in
    // show create and logout
    // if user is not logged in
    // show register and login
    const links = this.props.isUserLogin ? (
      <nav className={classes['nav']}>
        <Link className={classes['nav__link']} to='/note/create'>create</Link>
        <Link className={classes['nav__link']} to='/'>lastpad</Link>
        <p className={classes['nav__link']} onClick={this.logoutUser}>logout</p>
      </nav>
      ) : (
        <nav className={classes['nav']}>
        <Link className={classes['nav__link']} to='/register'>register</Link>
        <Link className={classes['nav__link']} to='/'>lastpad</Link>
        <Link className={classes['nav__link']} to='/login'>login</Link>
      </nav>
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