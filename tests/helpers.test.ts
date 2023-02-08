import {
  defineConfig,
  FileData,
  parseRequestData,
  prepare,
} from '../src/helpers'
import { QueryStringArrayFormat, RequestConfig } from '../src/types'

describe('defineConfig', () => {
  test('直接返回传入的配置', () => {
    const config = {} as any
    expect(defineConfig(config)).toBe(config)
  })
})

describe('FileData', () => {
  test('正确返回原始值', () => {
    ;[1, '2', false, () => 1, /ddd/, {}, null].forEach(item => {
      const fileData = new FileData(item)
      expect(fileData.getOriginalFileData()).toBe(item)
    })
  })
})

describe('parseRequestData', () => {
  test('正确解析出数据和文件数据', () => {
    expect(
      parseRequestData({
        x: 1,
        y: 2,
        f: new FileData(__filename),
      }),
    ).toEqual({
      data: {
        x: 1,
        y: 2,
      },
      fileData: {
        f: __filename,
      },
    })
  })

  test('传入非对象值时应将传入的值设为数据，且将文件数据设为空', () => {
    ;['', 2, false, []].forEach(item => {
      expect(parseRequestData(item as any)).toEqual({
        data: item,
        fileData: {},
      })
    })
  })
})

describe('prepare', () => {
  test('支持解析对象请求体', () => {
    expect(
      prepare({ path: '/test' } as Partial<RequestConfig> as any, {
        a: 1,
        b: '2',
      }),
    ).toMatchSnapshot('对象')
  })

  test('支持解析非对象请求体', () => {
    expect(
      prepare({ path: '/test' } as Partial<RequestConfig> as any, [
        1,
        2,
        3,
        { x: false },
      ]),
    ).toMatchSnapshot('数组')

    expect(
      prepare({ path: '/test' } as Partial<RequestConfig> as any, true),
    ).toMatchSnapshot('布尔值')
  })

  test('支持解析带参路径', () => {
    expect(
      prepare(
        {
          path: '/test/:a/{id}',
          paramNames: ['a', 'id'],
        } as Partial<RequestConfig> as any,
        { a: 1, b: '2', id: 110 },
      ),
    ).toMatchSnapshot('路径参数 1')

    expect(
      prepare(
        {
          path: '/test/a_{a}/id_{id}',
          paramNames: ['a', 'id'],
        } as Partial<RequestConfig> as any,
        { a: 1, b: '2', id: 110 },
      ),
    ).toMatchSnapshot('路径参数 2')

    expect(
      prepare(
        {
          path: '/test/a_{a}/id_{id}/id_{id}',
          paramNames: ['a', 'id'],
        } as Partial<RequestConfig> as any,
        { a: 1, b: '2', id: 110 },
      ),
    ).toMatchSnapshot('路径参数 3 - 全部替换')
  })

  test('支持追加查询参数', () => {
    expect(
      prepare(
        {
          path: '/search',
          queryNames: ['a', 'id'],
        } as Partial<RequestConfig> as any,
        { a: 1, b: '2', id: 110 },
      ),
    ).toMatchSnapshot()
  })

  test('查询参数支持数组', () => {
    expect(
      prepare(
        {
          path: '/search',
          queryNames: ['list'],
          queryStringArrayFormat: QueryStringArrayFormat.brackets,
        } as Partial<RequestConfig> as any,
        { list: [1, 2, 3] },
      ),
    ).toMatchSnapshot('brackets')

    expect(
      prepare(
        {
          path: '/search',
          queryNames: ['list'],
          queryStringArrayFormat: QueryStringArrayFormat.indices,
        } as Partial<RequestConfig> as any,
        { list: [1, 2, 3] },
      ),
    ).toMatchSnapshot('indices')

    expect(
      prepare(
        {
          path: '/search',
          queryNames: ['list'],
          queryStringArrayFormat: QueryStringArrayFormat.repeat,
        } as Partial<RequestConfig> as any,
        { list: [1, 2, 3] },
      ),
    ).toMatchSnapshot('repeat')

    expect(
      prepare(
        {
          path: '/search',
          queryNames: ['list'],
          queryStringArrayFormat: QueryStringArrayFormat.comma,
        } as Partial<RequestConfig> as any,
        { list: [1, 2, 3] },
      ),
    ).toMatchSnapshot('comma')

    expect(
      prepare(
        {
          path: '/search',
          queryNames: ['list'],
          queryStringArrayFormat: QueryStringArrayFormat.json,
        } as Partial<RequestConfig> as any,
        { list: [1, 2, 3] },
      ),
    ).toMatchSnapshot('json')
  })

  test('文件处理', async () => {
    const payload = prepare(
      { path: '/test' } as Partial<RequestConfig> as any,
      {
        file: new FileData(
          new Blob(['1'], {
            type: 'text1',
          }),
        ),
      },
    )
    const files: any[] = []
    payload.getFormData().forEach((v, k) => {
      files.push([k, v])
    })
    for (const file of files) {
      file[1] = file[1] instanceof File ? file[1].type : file[1]
    }
    expect(files).toMatchSnapshot('file-single')

    const payload2 = prepare(
      { path: '/test' } as Partial<RequestConfig> as any,
      {
        file: new FileData([
          new Blob(['1'], {
            type: 'text1',
          }),
          new Blob(['2'], {
            type: 'text2',
          }),
        ]),
      },
    )
    const files2: any[] = []
    payload2.getFormData().forEach((v, k) => {
      files2.push([k, v])
    })
    for (const file of files2) {
      file[1] = file[1] instanceof File ? file[1].type : file[1]
    }
    expect(files2).toMatchSnapshot('file-multiple')
  })
})
