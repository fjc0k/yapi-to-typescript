import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  output: {
    dir: 'client',
    format: ['cjs', 'esm'],
  },
  plugins: {
    typescript2: false,
  },
}

export default config
