import React, { Component } from "react";
import { toast } from "react-toastify";

import Card from "./Card";
import Button from "react-md/lib/Buttons";

import HighLight from "./../HighLight";

class Position extends Component {

  notify = () => {
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
  };

  getCode() {
    return `
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Position extends Component {
    notify = () => {
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
  };

    render(){
      return <button onClick={this.notify}>Notify</button>;
    }
  }
`;
  }

  render() {
    return (
      <Card title="Positioning toast">
        <p>By default all the toasts will be positionned on the top right of your browser. If a position is set on a toast, the one defined on ToastContainer will be overwritten</p>
        <p>The following values are allowed: <i>top-right, top-center, top-left, bottom-right, bottom-center, bottom-left</i></p>
        <p>
          For convenience, toast expose a <span className="code">POSITION</span> property to avoid any typo.
        </p>
        <HighLight>
          {`
            toast.POSITION.TOP_LEFT, toast.POSITION.TOP_RIGHT, toast.POSITION.TOP_CENTER
            toast.POSITION.BOTTOM_LEFT,toast.POSITION.BOTTOM_RIGHT, toast.POSITION.BOTTOM_CENTER
          `}
        </HighLight>

        <div>
          <Button raised primary onClick={this.notify} label="Notify" />
        </div>
        <HighLight>
          {this.getCode()}
        </HighLight>
      </Card>
    );
  }
}

export default Position;
