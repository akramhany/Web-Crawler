const { test, expect } = require('@jest/globals')
const {normalizeURL, getURLsFromHTML} = require('./crawl')


function testNormalizeURL() {
    const sampleURL = "example.com/path"

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
}

function testGetURLsFromHTML() {
    const htmlBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://potato.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://akram.dev"><span>Go to Boot.dev</span></a>
        </body>
    </html>
    `
    const baseURL = 'potato.boot.dev'
    const absoluteURLs = ['https://blog.boot.dev','https://potato.boot.dev','https://akram.dev']

    test('Test that relative URLs are converted to absolute URLs.', () => {
        const urls = getURLsFromHTML(htmlBody, baseURL)
        for (let url of urls) {
            expect(url).toContain('http')
        }
    })

    test('Test to be sure you find all the <a> tags in a body of HTML', () => {
        const urls = getURLsFromHTML(htmlBody, baseURL)
        expect(urls).toEqual(absoluteURLs)
    })
}

//testNormalizeURL()
testGetURLsFromHTML()