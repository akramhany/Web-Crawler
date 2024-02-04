const { test, expect } = require('@jest/globals')
const {normalizeURL} = require('./crawl')

const sampleURL = 1

test('test that no errors were thrown', () => {
    expect(() => normalizeURL(sampleURL)).not.toThrow();
})

test('test that the returned url is a string', () => {
    expect(typeof normalizeURL(sampleURL)).toBe('string');
})

test('make sure the returned url do not contain http(s)', () => {
    expect(normalizeURL(sampleURL)).not.toContain('http');
})

test('make sure the returned url do not contain //', () => {
    expect(normalizeURL(sampleURL)).not.toContain('//');
})

test('make sure the returned url do not contain :', () => {
    expect(normalizeURL(sampleURL)).not.toContain(':');
})