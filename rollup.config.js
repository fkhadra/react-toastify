import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';
const external = id => !id.startsWith('.') && !id.startsWith('/');
const getBabelConf = ({ useESModules, removePropTypes } = { useESModules: false, removePropTypes: false }) => {
  const plugins = [['@babel/transform-runtime', { useESModules }]];

  if (removePropTypes) {
    plugins.push(
      ['transform-react-remove-prop-types', { removeImport: true }]
    )
  }

  return {
    exclude: /node_modules/,
    runtimeHelpers: true,
    plugins
  }
};

export default [
  {
    input,
    external,
    output: { file: `cjs/${pkg.name}.js`, format: 'cjs' },
    plugins: [resolve(), babel(getBabelConf())]
  },
  {
    input,
    external,
    output: { file: `cjs/${pkg.name}.min.js`, format: 'cjs' },
    plugins: [resolve(), sizeSnapshot(), babel(getBabelConf({ removePropTypes: true })), uglify()]
  },
  {
    input,
    external,
    output: { file: `esm/${pkg.name}.js`, format: 'esm' },
    plugins: [resolve(), sizeSnapshot(), babel(getBabelConf({ useESModules: true }))]
  }
];
