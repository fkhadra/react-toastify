import React, { Component } from "react";
import { toast } from "react-toastify";

import Card from "./Card";
import Button from "react-md/lib/Buttons";

import HighLight from "./../HighLight";
import mobileImg from './../mobile.gif'

class Mobile extends Component {
  render() {
    return (
      <Card title="Mobile">
        <p>On mobile, the toast will use all the width.</p>
        <div className="md-text-center">
          <img src={mobileImg} alt=""/>
        </div>
      </Card>
    );
  }
}

export default Mobile;
