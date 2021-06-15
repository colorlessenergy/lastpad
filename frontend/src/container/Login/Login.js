import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginAction } from '../../store/actions/';
import { Redirect, Link } from 'react-router-dom';

// the styles are the same for the register and login form
import classes from '../Register/Register.module.css';


class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false
  }

  handleloginAsGuest = (ev) => {
    ev.preventDefault();

    let guestCredentials = {
      email: 'test@brianmunoz.co',
      password: 'test'
    }

    this.props.loginUser(guestCredentials);

    this.setState({
      error: false
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    let errorMessage = '';

    if (this.state.email.length === 0) {
      errorMessage += 'Email is missing! \n';
    }

    if (this.state.password.length === 0) {
      errorMessage += 'Password is missing!';
    }

    if (errorMessage !== '') {
      this.setState({
        error: errorMessage
      });
    } else {
      this.props.loginUser(this.state);

      this.setState({
        error: false
      });
    }
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value.trim()
    });

  }

  render() {
    if (this.props.isUserLogin) {
      return <Redirect to='/' />
    }

    return (
      <form 
        onSubmit={this.handleSubmit}
        className={[classes['form'], classes['center']].join(' ')}>
        <h1 className={classes['form__title']}>
          Sign into your account
        </h1>
        <div className={classes['form__group']}>
          <label
            className={classes['form__label']} 
            htmlFor="email">
            email
        </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={this.handleChange}
            className={[classes['form__input'], classes['form__input--mb']].join(' ')}
            value={this.state.email} />
        </div>
        <div
          className={classes['form__group']}>
          <label
            className={classes['form__label']}
            htmlFor="password">
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.handleChange}
            className={classes['form__input']}
            value={this.state.password} />
        </div>

        <div className={classes['form__group--button-container']}>
          <button
            className={classes['form__button']}>Login</button>

          <button
            onClick={this.handleloginAsGuest}
            className={[classes['form__button'], classes['form__button--guest']].join(' ')}>Login as guest</button>

          {/* errors made on the frontend */}
          {this.state.error ? (
              <p className={classes['error']}>
                {this.state.error}
              </p>
            ) : (
                null
          )}

          {/* error sent from backend */}

          { this.props.authError ? 
            (<p className={classes['error']}> 
            { this.props.authError }
          </p>) : (null)
          }
        </div>

        <div className={classes['login-register-prompt']}>
            Don't have an account? 
            <Link className={classes['link--blue']} to='/register'>Sign up</Link>
          </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    isUserLogin: state.auth.userIsLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch(LoginAction(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);