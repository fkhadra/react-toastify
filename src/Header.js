import React from "react";
import Button from 'react-md/lib/Buttons/Button';
import logo from "./logo.svg";

export default () =>
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2 className="white">Welcome to React-toastify</h2>
    <h6 className="white">React notification made easy !</h6>
    <div>
      <Button
        href="https://github.com/fkhadra/react-toastify"
        raised
        primary
        label="View on GitHub"
      />
        
      <Button
        raised
        primary
        href="https://github.com/fkhadra/react-toastify/zipball/master"
        label="Download .zip"
      />
      <Button
        raised
        primary
        href="https://github.com/fkhadra/react-toastify/tarball/master"
        label=" Download .tar.gz"
      />
    </div>
  </div>;
