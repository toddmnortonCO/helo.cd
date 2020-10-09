import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      img: '',
      content: '',
      author: '',
      authorPicture: ''
    }
  }

  getPostInformation = () => {
    
  }

  createPost = () => {
    const { title, imageURL, content } = this.state;

        axios.post('/api/post', {id: this.props.user.user_id, postImage: this.state.postImage})
        .then(() => {
            this.getUserPosts();
          this.setState({ postImage: '' })
        })
        .catch(err => console.log(err));
    }

  render() {
    return <div>
      <input>Title</input>
      <input>Image URL</input>
      <input>Content</input>
      <button onclick={this.createPost}>Post</button>
    </div>;
  }
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Post);