'use strict';

const expect = require('chai').expect;
const parse = require('.');

/*eslint-env mocha*/
describe('rfc7240', () => {

  it('parses simple flag', () => {
    expect(parse('foo')).to.deep.equal({ foo: true });
  });

  it('parses multiple flags', () => {
    expect(parse('foo, bar')).to.deep.equal({ foo: true, bar: true });
  });

  it('parses simple values', () => {
    expect(parse('foo=42')).to.deep.equal({ foo: '42' });
  });

  it('parses quoted values', () => {
    expect(parse('foo="bar, baz; qux"'))
      .to.deep.equal({ foo: 'bar, baz; qux' });
  });

  it('empty values are parsed as booleans', () => {
    expect(parse('foo; bar')).to.deep.equal({ foo: true, fooBar: true });
  });

  it('zero-length values are treated as empty values', () => {
    expect(parse('foo=""; bar')).to.deep.equal({ foo: true, fooBar: true });
    expect(parse('foo; bar=""')).to.deep.equal({ foo: true, fooBar: true });
  });

  it('token are not case sensitive', () => {
    expect(parse('foo')).to.deep.equal({ foo: true });
    expect(parse('FOO')).to.deep.equal({ foo: true });
    expect(parse('fOo')).to.deep.equal({ foo: true });
    expect(parse('FoO')).to.deep.equal({ foo: true });
  });

  it('values are case sensitive', () => {
    expect(parse('foo=bar')).to.deep.equal({ foo: 'bar' });
    expect(parse('foo=BAR')).to.deep.equal({ foo: 'BAR' });
    expect(parse('foo="bar"')).to.deep.equal({ foo: 'bar' });
    expect(parse('foo="BAR"')).to.deep.equal({ foo: 'BAR' });
  });

  it('treats arrays as comma-separated concatenation', () => {
    expect(parse(['respond-async, wait=100', 'handling=lenient']))
      .to.deep.equal({ respondAsync: true, wait: '100', handling: 'lenient' });
    expect(parse('respond-async, wait=100, handling=lenient'))
      .to.deep.equal({ respondAsync: true, wait: '100', handling: 'lenient' });
  });

  it('ignores duplicate preferences', () => {
    expect(parse('wait=100, wait=200')).to.deep.equal({ wait: '100' });
  });

  it('handles spaces in quoted values', () => {
    expect(parse('return=minimal; foo="some parameter"'))
      .to.deep.equal({ return: 'minimal', returnFoo: 'some parameter' });
  });

  it('handles spaces surrounding tokens and values', () => {
    expect(parse('return \t=\t minimal\t;\t foo \t=\t "some parameter" \t'))
      .to.deep.equal({ return: 'minimal', returnFoo: 'some parameter' });
  });

  it('handles complicated preferences', () => {
    expect(parse([
      'respond-async, wait = 100',
      'handling="strict"; abort-early; path-format = "json-pointer"',
      'response-cache-headers= "etag, last-modified"',
      'sure lets have some spaces = "where\'s waldo?"; ok=200',
      ' wait=400',
    ])).to.deep.equal({
      respondAsync: true,
      wait: '100',
      handling: 'strict',
      handlingAbortEarly: true,
      handlingPathFormat: 'json-pointer',
      responseCacheHeaders: 'etag, last-modified',
      sureLetsHaveSomeSpaces: 'where\'s waldo?',
      sureLetsHaveSomeSpacesOk: '200'
    });
  });

});

describe('parsed structure', () => {

  it('parses falsey headers into the empty object', () => {
    expect(parse('')).to.deep.equal({});
    expect(parse(null)).to.deep.equal({});
    expect(parse(undefined)).to.deep.equal({});
  });

  it('camel-cases tokens', () => {
    expect(parse('respond-async')).to.deep.equal({ respondAsync: true });
    expect(parse('has spaces')).to.deep.equal({ hasSpaces: true });
  });

  it('lower-cases single word tokens', () => {
    expect(parse('Lenient')).to.deep.equal({ lenient: true });
  });

  it('appends parameter names to token names', () => {
    expect(parse('left-part = 47; right-part = 56'))
      .to.deep.equal({ leftPart: '47', leftPartRightPart: '56' });
  });

});
