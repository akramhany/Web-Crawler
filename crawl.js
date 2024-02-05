const jsdom = require("jsdom")
const { JSDOM } = jsdom;

/* Takes an url and return its normalized version */
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

/* Takes an htmlBody and a baseURL and returns all the URLS found in this html body */
function getURLsFromHTML(htmlBody, baseURL) {
    const absoluteURL = `https://${baseURL}`;

    const dom = new JSDOM(htmlBody);
    const matchedNodes = dom.window.document.querySelectorAll('a')
    const urls = [];

    //Push each URL into urls array
    matchedNodes.forEach((node) => {
        //if the path isn't an absolute one, make it absolute path.
        if (node.href.includes('http'))
            urls.push(node.href)
        else
            urls.push(absoluteURL + node.href)
    })

    return urls.map((url) => {
        if (url.endsWith('/'))
            return url.slice(0, -1);
        return url
    })
}

/* Takes a baseURL for a website then recursively crawls all the URLS inside it and returns them in pages object */
async function crawlPage(baseURL, currentURL, pages) {
    try {
        const baseURLObj = new URL(baseURL);
        const currentURLObj = new URL(currentURL);

        //Make sure the 2 urls have the same domain name.
        if (baseURLObj.hostname !== currentURLObj.hostname)
            return pages;
        
        //Get the normalized URLS for the baseURL and the current URL
        const normCurrentURL = normalizeURL(currentURL);
        const normBaseURL = normalizeURL(baseURL);
        
        //Check if the current url was already crawled (exists in pages object)
        if (normCurrentURL in pages) {
            pages[normCurrentURL]++;        //if current url was already crawled, increment its appearance and return
            return pages;
        }

        //add the currentURL to the pages object (make its appearance 1 if its not the BaseURL)
        if (normBaseURL !== normCurrentURL) {
            pages[normCurrentURL] = 1;
        } else {
            pages[normBaseURL] = 0;
        }

        console.log(`Start crawling URL: ${currentURL}`);

        //Fetch html body from the url
        const response = await fetch(currentURL);
        if (response.status >= 400) {
            console.log('An Error Occured while fetching the data from the website');
            return pages;
        }

        //Make sure the returned data is a html body
        const responseType = response.headers.get('content-type');
        if (!responseType.includes('text/html')) {
            console.log('An Error Occured while fetching the data from the website');
            return pages;
        }

        //Convert the returned data into text
        const html = await response.text();
        
        //Get all URLS from the html body
        const urls = getURLsFromHTML(html, normBaseURL);

        //Loop over all the urls and crawl each one.
        for (let url of urls) {
            pages = await crawlPage(baseURL, url, pages);
        }

        //Return the pages object after finishing crawling all the pages.
        return pages;

    } catch(error) {

        console.log(error.message);
        return pages;
    }
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}