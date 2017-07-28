import React, { Component } from "react";

import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardText from "react-md/lib/Cards/CardText";

export default ({ children, title }) =>
  <Card className="md-cell md-cell--12">
    <CardTitle title={title} />
    <CardText>
      {children}
    </CardText>
  </Card>;
