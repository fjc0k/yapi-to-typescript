import path from 'node:path';
import { fileURLToPath } from 'node:url';
import consola from 'consola';
import fs from 'fs-extra';
import prompt from 'prompts';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { uniqueId, wait } from 'vtils';
import { run } from './cli.ts';
import { CatId } from './consts.ts';

vi.mock('consola', () => ({
  default: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

vi.mock('prompts', () => import('./__mocks__/prompts.ts'));

vi.mock('node-fetch', () => import('./__mocks__/node-fetch.ts'));

const mockedPrompt = prompt as typeof prompt & {
  setAnswer: (name: string, value: any) => void;
};

const dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(dirname, '../.tmp-ytt-test');

beforeAll(() => {
  fs.ensureDirSync(tempDir);
});

afterAll(() => {
  fs.removeSync(tempDir);
});

function getTempPaths() {
  const targetDir = path.join(tempDir, uniqueId('case'));
  fs.ensureDirSync(targetDir);
  const generatedConfigFile = path.join(targetDir, 'ytt.config.ts');
  const generatedApiFile = path.join(targetDir, 'src/api/index.ts');
  const generatedRequestFile = path.join(targetDir, 'src/api/request.ts');
  return {
    targetDir,
    generatedConfigFile,
    generatedApiFile,
    generatedRequestFile,
  };
}

async function runCli(cmd: string, configFile: string) {
  await run(cmd, {
    configFile,
  });
  await wait(100);
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedPrompt.setAnswer('configFileType', 'ts');
});

describe('cli', () => {
  test('help', async () => {
    const tempPaths = getTempPaths();

    let text = '';
    const log = vi.fn(message => {
      text = message;
    });
    vi.spyOn(console, 'log').mockImplementationOnce(log);

    await runCli('help', tempPaths.generatedConfigFile);

    expect(text).toMatchSnapshot('help');
  });

  test('没有配置文件生成将会报错', async () => {
    const tempPaths = getTempPaths();

    await runCli('', tempPaths.generatedConfigFile);

    expect(consola.error).toHaveBeenCalledTimes(1);
  });

  test('正确初始化配置文件 & 生成结果', async () => {
    const tempPaths = getTempPaths();

    // 初始化配置文件
    await runCli('init', tempPaths.generatedConfigFile);
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('配置文件');

    // 生成结果
    fs.writeFileSync(
      tempPaths.generatedConfigFile,
      fs
        .readFileSync(tempPaths.generatedConfigFile)
        .toString()
        .replace(
          "'yapi-to-typescript'",
          JSON.stringify(path.join(dirname, '../src')),
        )
        .replace(`dataKey: 'data',`, '')
        .replace(`id: 50,`, `id: ${CatId.test},`),
    );
    await runCli('', tempPaths.generatedConfigFile);
    expect(
      fs.readFileSync(tempPaths.generatedApiFile).toString(),
    ).toMatchSnapshot('接口文件');
    expect(
      fs.readFileSync(tempPaths.generatedRequestFile).toString(),
    ).toMatchSnapshot('请求文件');
  });

  test('检查到已有配置，可以选择覆盖', async () => {
    const tempPaths = getTempPaths();

    // 初始化配置文件
    await runCli('init', tempPaths.generatedConfigFile);
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('配置文件');

    // 修改配置文件
    fs.writeFileSync(tempPaths.generatedConfigFile, 'hello');
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('修改过的配置文件');

    // 覆盖配置文件
    mockedPrompt.setAnswer('override', true);
    await runCli('init', tempPaths.generatedConfigFile);
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('覆盖后的配置文件');
  });

  test('检查到已有配置，可以选择不覆盖', async () => {
    const tempPaths = getTempPaths();

    // 初始化配置文件
    await runCli('init', tempPaths.generatedConfigFile);
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('配置文件');

    // 修改配置文件
    fs.writeFileSync(tempPaths.generatedConfigFile, 'hello');
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('修改过的配置文件');

    // 不覆盖配置文件
    mockedPrompt.setAnswer('override', false);
    await runCli('init', tempPaths.generatedConfigFile);
    await wait(1000);
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('不覆盖后的配置文件');
  });

  test('支持钩子', async () => {
    const tempPaths = getTempPaths();

    // 初始化配置文件
    await runCli('init', tempPaths.generatedConfigFile);

    // 更新配置文件
    const successFile = path.join(tempPaths.targetDir, 'success.txt');
    const failFile = path.join(tempPaths.targetDir, 'fail.txt');
    const completeFile = path.join(tempPaths.targetDir, 'complete.txt');
    fs.writeFileSync(
      tempPaths.generatedConfigFile,
      fs
        .readFileSync(tempPaths.generatedConfigFile)
        .toString()
        .replace(
          "'yapi-to-typescript'",
          JSON.stringify(path.join(dirname, '../src')),
        )
        .replace(`dataKey: 'data',`, '')
        .replace(`id: 50,`, `id: ${CatId.test},`)
        .replace(
          /(?=\)\s*$)/s,
          `, {
            success: () => require('fs').writeFileSync(${JSON.stringify(successFile)}, 'success'),
            fail: () => require('fs').writeFileSync(${JSON.stringify(failFile)}, 'fail'),
            complete: () => require('fs').writeFileSync(${JSON.stringify(
              completeFile,
            )}, 'complete'),
          }`,
        ),
    );

    // 执行
    await runCli('', tempPaths.generatedConfigFile);
    expect(fs.existsSync(successFile)).toBe(true);
    expect(fs.readFileSync(successFile).toString()).toBe('success');
    expect(fs.existsSync(failFile)).toBe(false);
    expect(fs.existsSync(completeFile)).toBe(true);
    expect(fs.readFileSync(completeFile).toString()).toBe('complete');
  });
});
