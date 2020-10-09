import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRegister = () => {
    const { username, password } = this.state;
    if (password && password === password) {
      axios
        .post("api/register", { username, password })
        .then((res) => {
          this.props.getUser(res.data);
          this.props.history.push("/dash");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Passwords don't match");
    }
  };
  
  handleLogin = () => {
    const { username, password } = this.state;

    axios
      .post("api/login", { username, password })
      .then((res) => {
        this.props.getUser(res.data);
        this.props.history.push("/dash");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Helo</h1>
        <input onChange={(e) => this.handleInput(e)} placeholder='Username'></input>
        <input onChange={(e) => this.handleInput(e)} placeholder='Password'></input>
        <button onClick={this.handleLogin}>Login</button>
        <button onClick={this.handleRegister}>Register</button>
      </div>
    );
  }
}

export default connect(null, { getUser })(Auth);