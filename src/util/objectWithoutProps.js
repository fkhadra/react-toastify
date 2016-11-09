export default (obj, propsToRemove) => {
  const nextProps = Object.assign({}, obj);
  propsToRemove.forEach(v => delete nextProps[v]);

  return nextProps;
};
