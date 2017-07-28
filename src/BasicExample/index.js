import React, { Component } from "react";

import Simple from './Simple';
import RemoveToast from './RemoveToast';

export default (props) => (
  <div className="md-grid" style={{maxWidth: "1024px"}}>
    <Simple {...props}/>
    <RemoveToast />
  </div>
)