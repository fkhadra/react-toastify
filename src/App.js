import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

import injectSheet from "react-jss";
import Header from "./Header";
import BasicExample from "./BasicExample";

import "./App.css";


const style = {
  container: {
    maxWidth: "1080px",
    composes: "md-grid"
  }
};

class App extends Component {
  state = {
    position: toast.POSITION.TOP_RIGHT,
    delay: 5000,
    type: "default",
    autoClose: true,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    pauseOnHover: true
  };

  componentDidMount() {
    toast("Default Notification !");
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });
    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_LEFT
    });
    toast.warn("Warning Notification !", {
      position: toast.POSITION.BOTTOM_LEFT
    });
    toast.info("Info Notification !", {
      position: toast.POSITION.BOTTOM_CENTER
    });
    toast("Custom Style Notification !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'dark-toast',
      progressClassName: 'transparent-progress'
    });
  }

  handleCheckBox = (checked, e) => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  };

  setDelay = (value) => {
      this.setState({ delay: value > 0  ? parseInt(value, 10) : 1});
  }

  handleRadio = (value, e) =>{
    this.setState({
      [e.target.name]: value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Header />
          <BasicExample 
          handleCheckBox={this.handleCheckBox} 
          handleRadio={this.handleRadio}
          setDelay={this.setDelay}
          {...this.state}/>
        <ToastContainer 
          hideProgressBar={this.state.hideProgressBar}
          newestOnTop={this.state.newestOnTop}
          closeOnClick={this.state.closeOnClick}
          autoClose={this.state.autoClose === false ? false : this.state.delay}
          position={this.state.position}
          pauseOnHover={this.state.pauseOnHover}
        />
      </div>
    );
  }
}

export default injectSheet(style)(App);
