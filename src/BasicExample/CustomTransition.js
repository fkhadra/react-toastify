import React, { Component } from "react";
import { toast } from "react-toastify";
import Transition from "react-transition-group/Transition";

import Card from "./Card";
import Button from "react-md/lib/Buttons";

import HighLight from "./../HighLight";

function Trans({ children, position, ...props }) {
  return (
    <Transition
      {...props}
      timeout={800}
      onEnter={node => {
        node.classList.add("zoomIn");
        node.classList.add("animate");
      }}
      onExit={node => {
        node.classList.remove("zoomIn");
        node.classList.remove("animate");
        node.classList.add("zoomOut");
        node.classList.add("animate");
      }}
    >
      {children}
    </Transition>
  );
}

class CustomTransition extends Component {
  notify = () => {
    toast("ZoomIn and ZoomOut", {
      autoClose: 5000,
      transition: Trans
    });
  };

  getCode() {
    return `
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';
  import Transition from 'react-transition-group/Transition';

  // Any transition created with react-transition-group/Transition will work ! 
  const ZoomInAndOut = ({ children, position, ...props }) => (
    <Transition
      {...props}
      {/* Same as the animation duration */}
      timeout={800} 
      onEnter={ node => node.classList.add('zoomIn', 'animate')}
      onExit={node => {
        node.classList.remove('zoomIn', 'animate');
        node.classList.add('zoomOut', 'animate');
      }}
    >
      {children}
    </Transition>
  );

  class App extends Component {
    notify = () => {
      toast("ZoomIn and ZoomOut", {
        transition: ZoomInAndOut,
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
      <Card title="Define a custom enter and exit transition">
        <p>Animation is a good way to attract user attention. Be creative !</p>
        <ul>
          <li>
            <div>
              Let's use a zoomIn and zoomOut animation from animate.css
            </div>
            <HighLight>
              {`
            @keyframes zoomIn {
              from {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
              }

              50% {
                  opacity: 1;
                }
              }

              .zoomIn {
                animation-name: zoomIn;
              }

              @keyframes zoomOut {
                from {
                  opacity: 1;
                }

                50% {
                  opacity: 0;
                  transform: scale3d(.3, .3, .3);
                }

                to {
                  opacity: 0;
                }
              }

              .zoomOut {
                animation-name: zoomOut;
              }

              .animate{
                animation-duration: 800ms;
              }
              `}
            </HighLight>
            <div>Create a Transition and apply it
            <HighLight>{this.getCode()}</HighLight>
            </div>
          </li>
          <li>
            Or pass your transition to the ToastContainer to overwrite the
            default one.
            <HighLight>
              {`
            render(){
              return(
                {/*Component*/}
                <ToastContainer 
                  transition={ZoomInAndOut}
                />
                {/*Component*/}
              );
            }
            `}
            </HighLight>
          </li>
        </ul>
        <div>
          <Button
            raised
            primary
            onClick={this.notify}
            label="Custom Transition"
          />
        </div>
      </Card>
    );
  }
}

export default CustomTransition;
