import React, { Component } from "react";
import { toast } from "react-toastify";

import Card from "./Card";
import Button from "react-md/lib/Buttons";

import HighLight from "./../HighLight";

class Style extends Component {
  notify = () => {
    toast("Dark style notification with default type progress bar", {
      className: "dark-toast",
      autoClose: 5000
    });

    toast(
      "Dark style with transparent progress bar, the one used with others types.",
      {
        className: "dark-toast",
        progressClassName: "transparent-progress",
        autoClose: 5000
      }
    );

    toast("Dark style with ugly progress bar", {
      className: "dark-toast",
      progressClassName: "fancy-progress",
      autoClose: 5000
    });
  };

  getCode() {
    return `
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Style extends Component {
    notify = () => {
      toast("Dark style notification with default type progress bar",{
        className: 'dark-toast',
        autoClose: 5000
      });

      toast("Dark style with transparent progress bar, the one used with others types.",{
        className: 'dark-toast',
        progressClassName: 'transparent-progress',
        autoClose: 5000
      });

      toast("Dark style with ugly progress bar",{
        className: 'dark-toast',
        progressClassName: 'fancy-progress',
        autoClose: 5000
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
      <Card title="The style !">
        <p>Taste and colours are not always the same ! You have several options.</p>
        <ul>
          <li>
            Overwrite <span className="code">toastify-content</span> and
            <span className="code"> toastify__progress</span>
          </li>
          <li>
            <div>Create two css classes and pass them to a toast</div>
            <HighLight>
              {`
                .dark-toast{
                  background: #323232;
                  color: #fff;
                }

                .dark-toast > .toastify__close{
                  color: #fff;
                }

                .transparent-progress{
                  background:  rgba(255,255,255,.7);
                }

                .fancy-progress{
                  background: repeating-radial-gradient(red, yellow 10%, green 15%);
                }
                `}
            </HighLight>
            <div className="md-divider" />
            <HighLight>
              {this.getCode()}
            </HighLight>
          </li>
          <li>
            Or pass your classes to the ToastContainer to set the classes for
            all your toast in one shot.
            <HighLight>
              {`
            render(){
              return(
                {/*Component*/}
                <ToastContainer 
                  toastClassName="dark-toast" 
                  progressClassName="transparent-progress" 
                />
                {/*Component*/}
              );
            }
            `}
            </HighLight>
          </li>
        </ul>
        <div>
          <Button raised primary onClick={this.notify} label="Custom style" />
        </div>
      </Card>
    );
  }
}

export default Style;
