import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile, rename } from 'node:fs/promises';
import { exec } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';

const asyncExec = promisify(exec);

const packageJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);

try {
  const BASE_DIR = './src/addons';
  const dirs = await readdir(BASE_DIR);
  const MICRO_BUNDLE = './node_modules/.bin/microbundle';
  const TSC = './node_modules/.bin/tsc';

  for (const dir of dirs) {
    const entryPoint = path.join(BASE_DIR, dir, 'index.ts');
    const inDeclarationFile = path.join(BASE_DIR, dir, 'index.d.ts');
    const outDeclarationFile = path.join('addons', dir, 'index.d.ts');
    const exportKey = `./addons/${dir}`;
    const exportValues = {
      require: '',
      import: ''
    };

    if (!existsSync(entryPoint)) {
      throw new Error(`${entryPoint} does not exist`);
    }

    for (const moduleType of ['cjs', 'esm']) {
      const filename = moduleType === 'esm' ? 'index.esm.js' : 'index.js';
      const out = `addons/${dir}/${filename}`;

      const { stdout, stderr } = await asyncExec(
        `${MICRO_BUNDLE} -i ${entryPoint} -o ${out} --no-pkg-main -f ${moduleType} --jsx React.createElement --external react-toastify --compress false --generateTypes true`
      );
      console.log(stdout);
      console.log(stderr);

      if (moduleType === 'cjs') {
        exportValues.require = `./${out}`;
      } else if (moduleType === 'esm') {
        exportValues.import = `./${out}`;
      }
    }

    const { stdout, stderr } = await asyncExec(
      `${TSC} --declaration --emitDeclarationOnly ${entryPoint}`
    );

    console.log(stdout);
    console.log(stderr);
    await rename(inDeclarationFile, outDeclarationFile);

    packageJson.exports = Object.assign(packageJson.exports, {
      [exportKey]: exportValues
    });
  }

  await writeFile('./package.json', JSON.stringify(packageJson, null, 2));
} catch (error) {
  throw error;
}
