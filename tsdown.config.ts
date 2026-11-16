import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/**/*.{ts,json}', '!**/*.test.*', '!**/__*__/**'],
  format: ['esm'],
  unbundle: true,
  dts: true,
  outDir: 'lib',
  platform: 'node',
  clean: true,
  exports: false,
});
