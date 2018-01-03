import Uri from "../src/uri"
var expect = require('chai').expect

/** @test {Uri} */
describe('http/uri.js',() => {
  it('[toString] should return Uri as a string', () => {
    const uri = new Uri()
    expect(uri.toString()).to.be.empty

    uri.set(Uri.PROTOCOL, 'https')
    uri.set(Uri.HOST, 'abc.com')
    uri.set(Uri.PATH, '/dummy')
    uri.set(Uri.SEARCH, 'a=x&b=y')
    expect(uri.toString()).to.equal('https://abc.com/dummy?a=x&b=y')
    uri.setQuery({a: 'y', b: 'x'})
    expect(uri.toString()).to.equal('https://abc.com/dummy?a=y&b=x')

    expect(new Uri('https://abc.com/dummy?a=x&b=y').toString()).to.equal('https://abc.com/dummy?a=x&b=y')
  })
})
