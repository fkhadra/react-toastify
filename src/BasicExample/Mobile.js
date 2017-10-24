import React, { Component } from "react";
import { toast } from "react-toastify";

import Card from "./Card";
import Button from "react-md/lib/Buttons";

import HighLight from "./../HighLight";

class Mobile extends Component {
  render() {
    return (
      <Card title="Mobile">
        <p>On mobile, the toast will use all the width.</p>
        <div className="md-text-center">
          <img src="https://user-images.githubusercontent.com/5574267/28754040-ae7195ea-753d-11e7-86e1-f23c5e6bc531.gif" alt="react-toastify"/>
        </div>
      </Card>
    );
  }
}

export default Mobile;
