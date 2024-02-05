const jsdom = require("jsdom")
const { JSDOM } = jsdom;

function normalizeURL(url) {
    try {
        const urlObject = new URL(url)
        let resultURL = urlObject.hostname + urlObject.pathname;
        if (resultURL.endsWith('/')) {
            resultURL = resultURL.slice(0, -1);
        }
        return resultURL;
    } catch(error) {
        console.log(error.message)
        throw error;
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const absoluteURL = `https://${baseURL}/`;

    const dom = new JSDOM(htmlBody);
    const matchedNodes = dom.window.document.querySelectorAll('a')
    const urls = [];

    matchedNodes.forEach((node) => {
        urls.push(node.href)
    })

    const matchedURLs = urls.filter((url) => {
        if (url === absoluteURL)
            return true;
        return false;
    })

    return matchedURLs.map((url) => {
        if (url.endsWith('/'))
            return url.slice(0, -1);
        return url
    })
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
}