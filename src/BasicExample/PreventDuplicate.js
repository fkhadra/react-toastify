import React, { Component } from "react";
import { toast } from "react-toastify";

import Card from "./Card";
import Button from "react-md/lib/Buttons";

import injectSheet from "react-jss";
import HighLight from "./../HighLight";

class DuplicateToast extends Component {
  toastId = null;

  notify = () => {
    if (! toast.isActive(this.toastId)) {
      this.toastId = toast("I cannot be duplicated !");
    }
  };

  getCode() {
    return `
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Example extends Component {
    toastId = null;

    notify = () => {
      if (! toast.isActive(this.toastId)) {
        this.toastId = toast("I cannot be duplicated !");
      }
    }

    render(){
      return (
        <div>
          <button onClick={this.notify}>Notify</button>
        </div>
      );
    }
  }
`;
  }

  render() {
    return (
      <Card title="Prevent duplicate toast">
        <p>To prevent duplicates, you can check if a given toast is active by calling <span className="code">toast.isActive(id)</span> like the
        snippet below. With this approach, you can decide with more precision whether or not you want to display a toast.
        </p>
        <div>
          <Button raised primary onClick={this.notify} label="Spam me" />
        </div>
        <HighLight>
          {this.getCode()}
        </HighLight>
      </Card>
    );
  }
}

export default DuplicateToast;
