import { defineConfig, Options } from 'tsup';
import { resolve } from 'node:path';

const baseConfig: Options = {
  minify: true,
  target: 'es2018',
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  loader: { '.css': 'text' },
  banner: {
    js: '"use client";'
  },
  // Matches Vite's `?raw` query suffix — allows `import styles from '../style.css?raw'`
  // to resolve to the CSS file as a text string in both toolchains.
  esbuildPlugins: [
    {
      name: 'strip-raw-query',
      setup(build) {
        build.onResolve({ filter: /\.css\?raw$/ }, args => ({
          path: resolve(args.resolveDir, args.path.replace(/\?raw$/, '')),
          namespace: 'file'
        }));
      }
    }
  ]
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ['src/index.ts'],
    external: ['react'],
    clean: ['dist']
  },
  {
    ...baseConfig,
    entry: { unstyled: 'src/unstyled.ts' },
    external: ['react'],
    clean: ['dist']
  },
  {
    ...baseConfig,
    entry: {
      'use-notification-center/index': 'packages/use-notification-center/src/index.ts'
    },
    external: ['react', 'react-toastify'],
    clean: ['addons'],
    outDir: 'addons'
  }
]);
