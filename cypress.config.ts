import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  }
});
