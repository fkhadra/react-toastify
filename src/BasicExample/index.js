import React, { Component } from "react";

import Simple from './Simple';
import RemoveToast from './RemoveToast';
import PreventDuplicate from './PreventDuplicate';
import Hook from './Hook';
import CustomClose from './CustomClose';
import Style from './Style';
import Mobile from './Mobile';

export default (props) => (
  <div className="md-grid" style={{maxWidth: "1024px"}}>
    <Simple {...props}/>
    <RemoveToast />
    <PreventDuplicate />
    <Hook />
    <CustomClose />
    <Style />
    <Mobile />
  </div>
)