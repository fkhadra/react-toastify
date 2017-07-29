import React, { Component } from "react";
import { toast } from "react-toastify";

import Card from "./Card";
import Button from "react-md/lib/Buttons";

import HighLight from "./../HighLight";

class Hook extends Component {

  notify = () => {
      toast("Chuck Norris counted to infinity. Twice.", {
        onOpen: () => window.alert('I counted to infinity once then..'),
        onClose: () => window.alert('I counted to infinity twice')
      });
  };

  getCode() {
    return `
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Hook extends Component {
    notify = () => toast("Lorem ipsum dolor", {
      onOpen: (childrenProps) => window.alert('I counted to infinity once then..'),
      onClose: (childrenProps) => window.alert('I counted to infinity twice')
    });

    render(){
      return <button onClick={this.notify}>Notify</button>;
    }
  }
`;
  }

  render() {
    return (
      <Card title="Define hook ">
        <p>You can define two hooks on toast:</p>
        <ul>
          <li>onOpen is called inside componentDidMount</li>
          <li>onClose is called inside componentWillUnmount</li>
        </ul>
        <div>
          <Button raised primary onClick={this.notify} label="Show The Hooks" />
        </div>
        <HighLight>
          {this.getCode()}
        </HighLight>
      </Card>
    );
  }
}

export default Hook;
