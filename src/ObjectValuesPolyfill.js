const values = require('object.values');

if (!Object.values) {
  values.shim();
}
