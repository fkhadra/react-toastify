import React, { Component } from "react";
import { toast } from "react-toastify";

import Card from "./Card";
import Button from "react-md/lib/Buttons";

import HighLight from "./../HighLight";

const CloseButton = ({ closeToast }) => (
  <i
    className="material-icons"
    onClick={closeToast}
  >
  delete
  </i>
);

class CustomClose extends Component {

  notify = () => {
      toast("The close button change when Chuck Norris display a toast",{
        closeButton: <CloseButton />
      });
  };

  getCode() {
    return `
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  const CloseButton = ({ YouCanPassProps, closeToast }) => (
    <i
      className="material-icons"
      onClick={closeToast}
    >
    delete
    </i>
  );

  class CustomClose extends Component {
    notify = () => {
      toast("The close button change when Chuck Norris display a toast",{
        closeButton: <CloseButton YouCanPassProps="foo" />
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
      <Card title="Set a custom close button or simply remove it">
        <p>
          When you use a custom close button, your button will receive a <span className="code">closeToast</span> props. You need to call it in order to close the toast.
          The customCloseButton can be passed to the ToastContainer so all the toast display the custom close or you can set it by toast.
        </p>
        <p>
          If <span className="code">customCloseButton</span> is set to false, the close button will be not displayed.
        </p>
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

export default CustomClose;
