import React, { Component } from "react";
import { toast } from "react-toastify";

import TextField from 'react-md/lib/TextFields';
import Radio from 'react-md/lib/SelectionControls/Radio';
import Checkbox from "react-md/lib/SelectionControls/Checkbox";
import Card from "./Card";
import Button from "react-md/lib/Buttons";

import injectSheet from "react-jss";
import HighLight from "./../HighLight";

function getColors(type) {
  switch (type) {
    case "default":
    default:
      return "#fff";
    case "success":
      return "#07bc0c";
    case "error":
      return "#e74c3c";
    case "info":
      return "#3498db";
    case "warning":
      return "#f1c40f";
  }
}

const styles = {
  content: {
    display: "flex",
    justifyContent: "space-betwenn"
  },
  label: {
    lineHeight: "55px"
  },
  btn: {
    background: props => getColors(props.type)
  }
};

class Simple extends Component {
  notify = () =>
    this.props.type === "default"
      ? toast("Wow so easy !")
      : toast[this.getCurrentType()]("Wow so easy !");

  renderBoolProps(props) {
    return this.props[props] ? props : `${props}={false}`;
  }

  getCurrentType() {
    let type = "";
    switch (this.props.type) {
      case "default":
      default:
        type = "";
        break;
      case "success":
        type = "success";
        break;
      case "error":
        type = "error";
        break;
      case "info":
        type = "info";
        break;
      case "warning":
        type = "warn";
        break;
    }
    return type;
  }

  getCode = () => {
    const container = `
      <ToastContainer 
          position="${this.props.position}"
          autoClose={${this.props.autoClose === false
            ? false
            : this.props.delay}}
          ${this.props.autoClose !== false
            ? this.renderBoolProps("hideProgressBar")
            : ""}
          ${this.renderBoolProps("newestOnTop")}
          ${this.renderBoolProps("closeOnClick")}
          ${this.props.autoClose !== false
            ? this.renderBoolProps("pauseOnHover")
            : ""}
        />`.trim();
    return `
  import React, { Component } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

  class App extends Component {
    notify = () => ${this.props.type === "default"
      ? 'toast("Wow so easy !")'
      : `toast.${this.getCurrentType()}('Wow so easy !')`};

    render(){
      return (
        <div>
        <button onClick={this.notify}>Notify !</button>
        {/* One container to rule them all! */}
        ${container}
        ${this.isDefaultProps()
          ? "{/*Can be written <ToastContainer /> */}"
          : ""}
        </div>
      );
    }
  }
`;
  };

  isDefaultProps() {
    return (
      this.props.position === "top-right" &&
      (this.props.delay === 5000 && this.props.autoClose === true) &&
      this.props.hideProgressBar === false &&
      this.props.newestOnTop === false &&
      this.props.pauseOnHover &&
      this.props.closeOnClick
    );
  }

  getPositions() {
    return Object.keys(toast.POSITION).map(k => 
       <Radio
            id={toast.POSITION[k]}
            key={toast.POSITION[k]}
            inline
            name="position"
            value={toast.POSITION[k]}
            label={toast.POSITION[k]}
            checked={toast.POSITION[k] === this.props.position}
            onChange={this.props.handleRadio}
          />
    );
  }

  getTypes() {
    return Object.keys(toast.TYPE).map(k => 
       <Radio
            id={toast.TYPE[k]}
            key={toast.TYPE[k]}
            inline
            name="type"
            value={toast.TYPE[k]}
            label={toast.TYPE[k]}
            checked={toast.TYPE[k] === this.props.type}
            onChange={this.props.handleRadio}
          />
    );
  }

  handlePosition = value => this.props.handleSelect(value, "position");
  handleType = value => this.props.handleSelect(value, "type");

  render() {
    const { classes } = this.props;
    return (
      <Card title="Usage">
        <p>
          By default all toasts will inherits ToastContainer's props. Props defined on <span className="code">toast supersede ToastContainer's props</span>.
        </p>
        <div>
          <label className={classes.label} htmlFor="position">
            Position*:
          </label>
          {this.getPositions()}
        </div>

        <div>
          <label className={classes.label} htmlFor="type">
            Type*:
          </label>
          {this.getTypes()}
        </div>
        <div>
            <TextField
            id="delay"
            label="delay"
            type="number"
            value={this.props.delay}
            className="md-cell md-cell--bottom"
            onChange={this.props.setDelay}
          />
        </div>
        <Checkbox
          id="autoClose"
          name="autoClose"
          label="Auto close after delay*"
          checked={this.props.autoClose}
          onChange={this.props.handleCheckBox}
        />
        <Checkbox
          id="hideProgressBar"
          name="hideProgressBar"
          label="Hide progress bar (less fanciness !)"
          checked={this.props.hideProgressBar}
          onChange={this.props.handleCheckBox}
        />
        <Checkbox
          id="newestOnTop"
          name="newestOnTop"
          label="Newest on top"
          checked={this.props.newestOnTop}
          onChange={this.props.handleCheckBox}
        />
        <Checkbox
          id="closeOnClick"
          name="closeOnClick"
          label="Close on click*"
          checked={this.props.closeOnClick}
          onChange={this.props.handleCheckBox}
        />
        <Checkbox
          id="pauseOnHover"
          name="pauseOnHover"
          label="Pause progress bar on hover*"
          checked={this.props.pauseOnHover}
          onChange={this.props.handleCheckBox}
        />
        <p><i>* can be overwritten by toast props</i></p>
        <Button
          raised
          onClick={this.notify}
          label="Notify !"
          className={classes.btn}
        />
        
        <HighLight>
          {this.getCode()}
        </HighLight>
      </Card>
    );
  }
}

export default injectSheet(styles)(Simple);
