import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import injectSheet from 'react-jss'
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';

import Header from './Header';

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

const style = {
  container: {
    maxWidth: '1080px',
    composes: 'md-grid'
  }
};

class App extends Component {
  componentDidMount(){
    toast('Default Notification !');
    toast.success('Success Notification !',{
      position: toast.POSITION.TOP_CENTER
    });
    toast.error('Error Notification !',{
      position: toast.POSITION.BOTTOM_RIGHT
    });
    toast.warn('Warning Notification !',{
      position: toast.POSITION.BOTTOM_LEFT
    });
    toast.info('Info Notification !',{
      position: toast.POSITION.BOTTOM_CENTER
    });
    toast('Default Notification !', {
      position: toast.POSITION.TOP_LEFT
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Header />
        <div className={classes.container}>
            <Card className="md-cell md-cell--12">
              <CardTitle title="Getting Started"/>
            </Card>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default injectSheet(style)(App);
