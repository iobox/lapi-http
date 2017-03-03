var expect = require('chai').expect
import Response from '../src/response'

/** @test {Response} */
describe('http/response.js', () => {
  let response
  beforeEach(() => {
    response = new Response()
  })

  /** @test {Response#send} */
  it('[send] should send a response', () => {
    let resource = {
      statusCode: null,
      headers: {},
      end: function(content) {
        expect(content).to.equal(response.getBody().toString())
      },
      setHeader: function(key, value) {
        this.headers[key] = value
      }
    }

    const content = {'text': 'Some content!'},
          headers = {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'}

    response.setHeader(headers)
    response.send(resource)
    expect(response.getHeader().all()).to.deep.equal(headers)
  })
})
