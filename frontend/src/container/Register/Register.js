import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { RegisterAction } from '../../store/actions/';

import classes from './Register.module.css';


class Register extends Component {
  state = {
    email: '',
    password: '',
    error: false
  }


  handleSubmit = (ev) =>  {
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

      console.log(this.props.history);
      this.props.registerUser(this.state, this.props.history);
      
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

  render () {
    return (
      <div className={classes['split']}>
        <div className={classes['info']}>
          <h2>
            LastPad
          </h2>

          <div>
            <p className={classes['reason__title']}>
              Want to write your thoughts down
            </p>
            <p className={classes['reason__content']}>
              create a account to be
              able to create notes easily :)
            </p>
          </div>
        </div>
        <form 
          onSubmit={this.handleSubmit}
          className={classes['form']}>
          <h1 className={classes['form__title']}>
            Create an account
          </h1>
          <div className={classes['form__group']}>
            <label
              className={classes['form__label']}
              htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={this.handleChange}
              placeholder="email"
              className={[classes['form__input'], classes['form__input--mb']].join(' ')}
              value={this.state.email} />
          </div>
          <div className={classes['form__group']}>
            <label
              className={classes['form__label']}
              htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
              placeholder="password"
              className={classes['form__input']}
              value={this.state.password} />
          </div>

          <div className={classes['form__group--button-container']}>
            <button className={classes['form__button']}>Create your account</button>
            {/* errors made on the frontend */}
            {this.state.error ? (
              <p className={classes['error']}>
                {this.state.error}
              </p>
            ) : (
                null
              )}

            {/* errors sent from backend */}
            {
              this.props.authError ? (
                <p className={classes['error']}>
                  {this.props.authError}
                </p>
              ) : (
                  null
                )}
          </div>

          <div className={classes['login-register-prompt']}>
            Already have an account? 
            <Link className={classes['link--blue']} to='/login'>Sign in </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user, history) => {
      dispatch(RegisterAction(user, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);