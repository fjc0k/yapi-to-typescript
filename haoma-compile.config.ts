import { getCompileConfig } from 'haoma'

export default [
  getCompileConfig({
    name: 'esm',
    inputFiles: ['src/**/*.ts'],
    module: 'esm',
    target: file => (/helpers|types/.test(file) ? 'browser' : 'node'),
    outDir: 'lib/esm',
    rollupDts: true,
    rollupDtsIncludedPackages: ['vtils'],
    rollupDtsFiles: ['**/index.d.ts'],
  }),
  getCompileConfig({
    name: 'cjs',
    inputFiles: ['src/**/*.ts'],
    module: 'cjs',
    target: file => (/helpers|types/.test(file) ? 'browser' : 'node'),
    outDir: 'lib/cjs',
    emitDts: false,
  }),
]
