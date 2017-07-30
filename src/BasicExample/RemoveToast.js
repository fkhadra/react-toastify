import React, { Component } from "react";
import { toast } from "react-toastify";

import Card from "./Card";
import Button from "react-md/lib/Buttons";

import HighLight from "./../HighLight";

class RemoveToast extends Component {
  toastId = null;

  notify = () => {
    if (!this.toastId) {
      this.toastId = toast("Click on Dismiss to remove me", {
        autoClose: false,
        closeOnClick: false,
        closeButton: false
      });
    }
  };

  dismiss = () => {
    toast.dismiss(this.toastId);
    this.toastId = null;
  }

  dismissAll = () => toast.dismiss();

  getCode() {
    return `
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Example extends Component {
    toastId = null;

    notify = () => this.toastId = toast("Lorem ipsum dolor");

    dismiss = () =>  toast.dismiss(this.toastId);

    dismissAll = () =>  toast.dismiss();

    render(){
      return (
        <div>
          <button onClick={this.notify}>Notify</button>
          <button onClick={this.dismiss}>Dismiss</button>
          <button onClick={this.dismissAll}>Dismiss All</button>
        </div>
      );
    }
  }
`;
  }

  render() {
    return (
      <Card title="Remove Toast Programmatically">
        <p>
          An id is returned each time you display a toast, use it to remove a given toast programmatically by calling <span className="code">toast.dismiss(id);</span>
        </p>
        <p>
          Without args, all the displayed toasts will be dismissed.
        </p>
        <div>
          <Button raised primary onClick={this.notify} label="Notify" />

          <Button raised secondary onClick={this.dismiss} label="Dismiss" />

          <Button raised primary onClick={this.dismissAll} label="Dismiss all" />
        </div>
        <HighLight>
          {this.getCode()}
        </HighLight>
      </Card>
    );
  }
}

export default RemoveToast;
