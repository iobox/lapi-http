var expect = require('chai').expect
const InvalidArgumentException = require('lapi-common').exception.InvalidArgumentException
import Controller from '../src/controller'
import Request from '../src/request'
import Response from '../src/response'

/** @test {Controller} */
describe('controller.js', function() {
  let controller
  beforeEach(function() {
    controller = new Controller()
  })

  /** @test {Controller#getRequest} */
  it('[getRequest] should return an instanceof Request', () => {
    expect(controller.getRequest()).to.be.an.instanceof(Request)
  })

  /** @test {Controller#setRequest} */
  it('[setRequest] should allow to set an instance of Request', () => {
    expect(() => {controller.setRequest(null)}).to.throw(InvalidArgumentException)
    let request = new Request()
    request.set('foo', 'bar')
    controller.setRequest(request)
    expect(controller.getRequest()).to.deep.equal(request)
  })

  /** @test {Controller#getResponse} */
  it('[getResponse] should return an instanceof Response', () => {
    expect(controller.getResponse()).to.be.an.instanceof(Response)
  })

  /** @test {Controller#setResponse} */
  it('[setResponse] should allow to set an instance of Response', () => {
    expect(() => {controller.setResponse(null)}).to.throw(InvalidArgumentException)
    let response = new Response()
    controller.setResponse(response)
    expect(controller.getResponse()).to.deep.equal(response)
  })
})