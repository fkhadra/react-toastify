export default function (obj) {
  const values = [];
  Object.keys(obj).forEach(key => values.push(obj[key]));
  return values;
}
