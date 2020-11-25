import { SwaggerToYApiServer } from '../src/SwaggerToYApiServer'

describe('SwaggerToYApiServer', () => {
  test('表现正常', async () => {
    const server = new SwaggerToYApiServer({
      swaggerJsonUrl: 'https://petstore.swagger.io/v2/swagger.json',
    })
    const serverUrl = await server.start()
    await server.stop()
    expect(serverUrl.startsWith('http://127.0.0.1:')).toBeTruthy()
  })
})
