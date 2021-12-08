import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

(fs.rmSync || fs.rmdirSync)('assets/runtime', { recursive: true, force: true });

const external = [].concat(
	Object.keys(pkg.dependencies || {}),
	Object.keys(pkg.peerDependencies || {}),
	Object.keys(process.binding('natives')),
	'typescript',
	'svelte2tsx'
);

export default [
	{
		input: 'src/cli.ts',
		output: {
			file: 'dist/cli.mjs',
			format: 'esm'
		},
		external: (id) => {
			return external.includes(id);
		},
		plugins: [
			replace({
				preventAssignment: true,
				values: {
					__VERSION__: pkg.version
				}
			}),
			resolve({
				extensions: ['.mjs', '.js', '.ts']
			}),
			commonjs(),
			typescript({ tsconfig: './tsconfig.json' })
		],
		preserveEntrySignatures: true
	}
];
