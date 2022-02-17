module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        targets: '> 0.25%, not dead, not ie 11',
        // {
        //   node: 'current',
        // },
      },
    ],
  ],
};
