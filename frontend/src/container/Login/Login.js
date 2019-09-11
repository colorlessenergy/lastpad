import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginAction, userIsLogin } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';


class Login extends Component {
  state = {
    email: '',
    password: ''
  }


  handleSubmit = (ev) => {
    ev.preventDefault();
    
    this.props.loginUser(this.state);
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
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">
            email
        </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email} />
        </div>
        <div>
          <label htmlFor="password">
            password
        </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password} />
        </div>

        <div>
          <button>submit</button>

          { this.props.authError ? (<p> 
            { this.props.authError }
          </p>) : (null)
          }
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