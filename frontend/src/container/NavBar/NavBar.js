import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userIsLogin, logoutUser } from '../../store/actions/';

import classes from './NavBar.module.css';

import {createOfflineToOnline} from '../../shared/online-check';


class NavBar extends Component {

  componentDidMount = () => {
    this.props.userIsLogin();

    // check every 5 seconds if there is a new change
    setInterval(createOfflineToOnline, 5000);
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
        <Link className={classes['nav__link']} to='/'>lastpad</Link>
        <div>
          <Link className={[classes['nav__link'], classes['nav__link--margin']].join(' ')} to='/note/create'>create</Link>
          <p className={classes['nav__link']} onClick={this.logoutUser}>logout</p>
        </div>
      </nav>
      ) : (
        <nav className={classes['nav']}>
        <Link className={classes['nav__link']} to='/'>lastpad</Link>
        <div>
          <Link className={[classes['nav__link'], classes['nav__link--margin']].join(' ')} to='/register'>register</Link>
          <Link className={classes['nav__link']} to='/login'>login</Link>
        </div>
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
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));