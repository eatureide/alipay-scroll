import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import less from 'rollup-plugin-less';
import externalGlobals from 'rollup-plugin-external-globals';
import livereload from 'rollup-plugin-livereload';
import pkg from './package.json';

const commonConfig = {
  input: 'src/index.tsx',
  external: ['react', 'react-dom'], // 不参与打包
  inlineDynamicImports: true, // 支持动态加载
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.jsx', '.tsx', '.js', '.ts'],
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
    }),
  ],
};

const addPlugins = (plugins) => {
  return {
    ...commonConfig,
    plugins: [...commonConfig.plugins, ...plugins],
  };
};

const development = () => {
  return {
    ...addPlugins([
      less({ output: 'demo/static/index.css' }),
      serve({
        open: true,
        port: 3001,
        contentBase: 'demo',
      }),
      externalGlobals({
        react: 'React',
        'react-dom': 'ReactDOM',
      }),
      livereload(),
    ]),
    input: 'demo/index.tsx',
    output: {
      file: 'demo/static/index.js',
      format: 'umd',
      sourcemap: true,
      name: 'index',
    },
  };
};

const production = () => {
  return [
    {
      ...addPlugins([less({ insert: true, output: './lib/index.css' })]),
      output: {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
    },
    {
      ...addPlugins([less({ insert: true, output: './es/index.css' })]),
      output: {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    },
  ];
};

export default { development, production }[process.env.NODE_ENV]();
