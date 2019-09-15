import {FileData, parseRequestData} from '../src/helpers'

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

  test('传入非对象值时应将传入的值设为数据，且将文件数据设为空', () => {
    ['', 2, false, []].forEach(item => {
      expect(parseRequestData(item as any)).toEqual({
        data: item,
        fileData: {},
      })
    })
  })
})
