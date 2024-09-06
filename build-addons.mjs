import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile, rename } from 'node:fs/promises';
import { exec } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';

const asyncExec = promisify(exec);

const packageJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);

const BASE_DIR = './src/addons';
const MICRO_BUNDLE = './node_modules/.bin/microbundle';

try {
  const dirs = await readdir(BASE_DIR);

  for (const dir of dirs) {
    if (dir.startsWith('.')) continue;
    
    let entryPoint = path.join(BASE_DIR, dir, 'index.ts');
    const exportKey = `./addons/${dir}`;
    const exportValues = {
      types: `./addons/${dir}/index.d.ts`,
      require: '',
      import: ''
    };

    if (!existsSync(entryPoint)) {
      if (existsSync(`${entryPoint}x`)) {
        entryPoint = `${entryPoint}x`;
      } else {
        throw new Error(`${entryPoint} does not exist`);
      }
    }

    for (const moduleType of ['cjs', 'esm']) {
      const filename = moduleType === 'esm' ? 'index.esm.mjs' : 'index.js';
      const out = `./dist/addons/${dir}/${filename}`;
      const exportOut = `./addons/${dir}/${filename}`;

      const { stdout, stderr } = await asyncExec(
        `${MICRO_BUNDLE} -i ${entryPoint} -o ${out} --no-pkg-main -f ${moduleType} --jsx React.createElement --external react-toastify --compress false --tsconfig tsconfig.build.json`
      );
      console.log(stdout);
      console.log(stderr);

      if (moduleType === 'cjs') {
        exportValues.require = exportOut;
      } else if (moduleType === 'esm') {
        exportValues.import = exportOut;
      }
    }

    packageJson.exports = Object.assign(packageJson.exports, {
      [exportKey]: exportValues
    });
  }

  await writeFile('./package.json', JSON.stringify(packageJson, null, 2));
  await rename('./dist/addons', './addons');
} catch (error) {
  throw error;
}
