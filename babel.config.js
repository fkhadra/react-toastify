module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        targets: '>0.5%, not ie 11, not op_mini all',
      },
    ],
  ],
};
