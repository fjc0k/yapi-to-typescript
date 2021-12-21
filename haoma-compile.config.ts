import { getCompileConfig } from 'haoma'

export default [
  getCompileConfig({
    name: 'esm',
    inputFiles: ['src/**/*.ts'],
    copyOnly: file => file.includes('templates'),
    module: 'esm',
    target: file => (file.includes('helpers') ? 'browser' : 'node'),
    outDir: 'lib/esm',
    rollupDts: true,
    rollupDtsIncludedPackages: ['vtils'],
    rollupDtsFiles: ['**/index.d.ts'],
  }),
  getCompileConfig({
    name: 'cjs',
    inputFiles: ['src/**/*.ts'],
    copyOnly: file => file.includes('templates'),
    module: 'cjs',
    target: file => (file.includes('helpers') ? 'browser' : 'node'),
    outDir: 'lib/cjs',
    emitDts: false,
  }),
]
