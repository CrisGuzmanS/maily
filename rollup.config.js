// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './index.js',
  output: [
    { file: 'dist/maily.cjs.js', format: 'cjs' },
    { file: 'dist/maily.esm.js', format: 'esm' }
  ],
  plugins: [nodeResolve(), commonjs()],
  external: ['nodemailer', 'handlebars', 'arrowy-env'],
};
