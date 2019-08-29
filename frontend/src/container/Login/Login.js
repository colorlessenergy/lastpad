import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginAction } from '../../store/actions/auth';


class Register extends Component {
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
        </div>
      </form>
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
    loginUser: (user) => {
      dispatch(LoginAction(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);