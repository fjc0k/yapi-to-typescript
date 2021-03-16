import { getCompileConfig } from 'haoma'

export default [
  getCompileConfig({
    name: 'esm',
    inputFiles: ['src/**/*.ts'],
    module: 'esm',
    target: file => (/helpers/.test(file) ? 'browser' : 'node'),
    outDir: 'lib/esm',
    rollupDts: true,
    rollupDtsFiles: ['**/index.d.ts'],
  }),
  getCompileConfig({
    name: 'cjs',
    inputFiles: ['src/**/*.ts'],
    module: 'cjs',
    target: file => (/helpers/.test(file) ? 'browser' : 'node'),
    outDir: 'lib/cjs',
    emitDts: false,
  }),
]
