import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const rollupConfig = [
  {
    file: 'lib/spaceships.esm.js',
    format: 'esm',
    sourcemap: true,
  },
  {
    file: 'lib/spaceships.umd.js',
    format: 'umd',
    name: 'spaceships',
    sourcemap: true,
  },
].map(output => ({
  output,
  input: 'src/index.js',
  plugins: [
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
    terser(),
  ],
}));

export default rollupConfig;
