import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from "../../Redux/reducer";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      verPassword: ""
    };
  }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  register = (e) => {    
      axios
        .post("/api/register", { username: this.state.username, password: this.state.password })
        .then((res) => {
          this.props.getUser(res.data);
          this.props.history.push("/dash");
        })
        .catch((err) => console.log(err));
    } 
  
  
  login = (e) => {
    axios
      .post("/api/login", {username: this.state.username, password: this.state.password})
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
        <input name='username' onChange={(e) => this.handleInput(e)} placeholder='Username'></input>
        <input name='password' onChange={(e) => this.handleInput(e)} placeholder='Password'></input>
        <button onClick={this.login}>Login</button>
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}


export default connect(null, { getUser })(Auth);