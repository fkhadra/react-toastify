"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./cjs/react-toastify.min.js");
} else {
  module.exports = require("./cjs/react-toastify.js");
}