import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { exec } from 'node:child_process';
import path from 'node:path';

const packageJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);

const BASE_DIR = './src/addons';
const dirs = await readdir(BASE_DIR);

dirs.forEach(dir => {
  const entryPoint = path.join(BASE_DIR, dir, 'index.ts');
  if (!existsSync(entryPoint)) {
    throw new Error(`${entryPoint} does not exist`);
  }
  const exportKey = `./addons/${dir}`;
  const exportValues = {
    require: '',
    import: ''
  };

  ['cjs', 'esm'].forEach(moduleType => {
    const filename = moduleType === 'esm' ? 'index.esm.js' : 'index.js';
    const out = `addons/${dir}/${filename}`;

    exec(
      `./node_modules/.bin/microbundle -i ${entryPoint} -o ${out} --no-pkg-main -f ${moduleType} --jsx React.createElement --external react-toastify --compress false`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
        }

        console.log(stdout);
        console.log(stderr);
      }
    );

    if (moduleType === 'cjs') {
      exportValues.require = `./${out}`;
    } else if (moduleType === 'esm') {
      exportValues.import = `./${out}`;
    }
  });

  packageJson.exports = Object.assign(packageJson.exports, {
    [exportKey]: exportValues
  });
});

await writeFile('./package.json', JSON.stringify(packageJson, null, 2));
