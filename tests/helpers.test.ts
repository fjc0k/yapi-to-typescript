import { FileData, parseRequestData } from '../src/helpers'

describe('FileData', () => {
  test('正确返回原始值', () => {
    [1, '2', false, () => {}, /ddd/, {}, null].forEach(item => {
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
    )
      .toEqual({
        data: {
          x: 1,
          y: 2,
        },
        fileData: {
          f: __filename,
        },
      })
  })

  test('传入非对象值时应返回空的数据和文件数据对象', () => {
    ['', 2, false, [], /ff/].forEach(item => {
      expect(parseRequestData(item as any)).toEqual({
        data: {},
        fileData: {},
      })
    })
  })
})
