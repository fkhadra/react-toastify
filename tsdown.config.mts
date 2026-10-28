import { defineConfig, type UserConfig } from 'tsdown';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const RAW_QUERY = /\?raw$/;

const baseConfig: UserConfig = {
  platform: 'browser',
  minify: true,
  target: 'es2018',
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  banner: { js: '"use client";' },
  plugins: [
    {
      name: 'raw-query',
      resolveId(source, importer) {
        if (!RAW_QUERY.test(source) || !importer) return;
        return resolve(dirname(importer), source);
      },
      load(id) {
        if (!RAW_QUERY.test(id)) return;
        return `export default ${JSON.stringify(readFileSync(id.replace(RAW_QUERY, ''), 'utf8'))};`;
      }
    }
  ]
};

export default defineConfig([
  { ...baseConfig, entry: ['src/index.ts'] },
  { ...baseConfig, entry: { unstyled: 'src/unstyled.ts' }, clean: false },
  {
    ...baseConfig,
    entry: { 'use-notification-center/index': 'packages/use-notification-center/src/index.ts' },
    deps: { neverBundle: ['react-toastify'] },
    outDir: 'addons'
  }
]);
