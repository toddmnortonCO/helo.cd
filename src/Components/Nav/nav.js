import React, { Component } from "react";
import { connect } from 'react-redux';

class Nav extends Component {  
  constructor(props) {
    super(props);
  }

  

  render() {
    return <div>
      <button path='/'>Home</button>
      <button path='/post/:postid'>New Post</button>
      <button >Logout</button>
    </div>;
  }
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Nav);