import fetchApiCollection from '../src/fetchApiCollection'

test('登录失败', async () => {
  await expect(fetchApiCollection({
    projectUrl: 'http://foo.bar/project/20/interface/api',
    login: {
      email: 'hello@x.xx',
      password: 'errorPassword',
    },
  } as any)).rejects.toThrowErrorMatchingSnapshot()
})

test('登录成功，并成功获取 API 列表', async () => {
  expect(await fetchApiCollection({
    projectUrl: 'http://foo.bar/project/20/interface/api',
    login: {
      email: 'hello@x.xx',
      password: 'correctPassword',
    },
  } as any)).toMatchSnapshot()
})
