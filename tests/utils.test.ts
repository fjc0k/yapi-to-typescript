import { FileData, parseRequestData } from '../src/utils'

test('FileData', () => {
  [1, '2', false, () => {}, /ddd/, {}, null].forEach(item => {
    const fileData = new FileData(item)
    expect(fileData.getOriginalFileData()).toBe(item)
  })
})

test('parseRequestData', () => {
  expect(parseRequestData({
    x: 1,
    y: 2,
    f: new FileData(__filename),
  })).toEqual({
    data: {
      x: 1,
      y: 2,
    },
    fileData: {
      f: new FileData(__filename),
    },
  })
})
