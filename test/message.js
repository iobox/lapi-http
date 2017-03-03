var expect = require('chai').expect
import Message from '../src/message'
import Header from '../src/header'
import Body from '../src/body'

/** @test {Message} */
describe('http/message.js',() => {
  let message
  beforeEach(() => {
    message = new Message()
  })

  /** @test {Message#getHeader} */
  it('[getHeader] should return an instance of Header', () => {
    expect(message.getHeader()).to.be.an.instanceof(Header)
  })

  /** @test {Message#getBody} */
  it('[getBody] should return an instance of Body', () => {
    expect(message.getBody()).to.be.an.instanceof(Body)
  })
})
