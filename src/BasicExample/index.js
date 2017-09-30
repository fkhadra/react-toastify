import React, { Component } from "react";

import Simple from './Simple';
import RemoveToast from './RemoveToast';
import PreventDuplicate from './PreventDuplicate';
import Hook from './Hook';
import CustomClose from './CustomClose';
import Style from './Style';
import Mobile from './Mobile';
import Position from './Position';
import CustomTransition from './CustomTransition';

export default (props) => (
  <div className="md-grid" style={{maxWidth: "1024px"}}>
    <Simple {...props}/>
    <Position />
    <RemoveToast />
    <PreventDuplicate />
    <Hook />
    <CustomClose />
    <CustomTransition />
    <Style />
    <Mobile />
  </div>
)