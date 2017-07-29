import React from "react";

import logo from "./logo.svg";

export default () =>
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to React-toastify</h2>
    <h6>Adding a context menu to your react app has never been easier!</h6>
    <div>
      <a
        href="https://github.com/fkhadra/react-toastify"
        className="button button-primary"
      >
        View on GitHub
      </a>
      <a
        href="https://github.com/fkhadra/react-toastify/zipball/master"
        className="button button-primary"
      >
        Download .zip
      </a>
      <a
        href="https://github.com/fkhadra/react-toastify/tarball/master"
        className="button button-primary"
      >
        Download .tar.gz
      </a>
    </div>
  </div>;
