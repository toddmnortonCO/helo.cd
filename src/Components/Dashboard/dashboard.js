import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      boolean: true,
    };
  }

  componentDidMount() {
    if (!this.props.user.email) {
      this.props.history.push("/");
    }
  }

  handleInput = (val) => {
    this.setState({ postImage: val });
  };

  getUserPosts = () => {
    axios
      .get(`/api/posts/${this.props.user.user_id}`)
      .then((res) => this.setState({ posts: res.data }))
      .catch((err) => console.log(err));
  };

  createPost = () => {
    axios
      .post("/api/post", {
        id: this.props.user.user_id,
        postImage: this.state.postImage,
      })
      .then(() => {
        this.getUserPosts();
        this.setState({ postImage: "" });
      })
      .catch((err) => console.log(err));
  };

  resetSearch = () => {
    
  }

  render() {
    console.log(this.props);
    // const mappedPosts = this.state.posts.map((post, i))

    return (
      <div>
        Dashboard
        <input>Search</input>
        <button>Reset</button>
        {/* <section>{mappedPosts}</section> */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);