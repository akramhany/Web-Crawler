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


module.exports = {
    normalizeURL,
}