const {argv} = require('node:process')
const {crawlPage} = require('./crawl')
const {printReport} = require('./report')

async function main() {
    if (argv.length === 3) {
        console.log('crawling started from baseURL: ' + argv[2])
    } else {
        console.log('Usage: npm start BASE_URL')
        process.exit(1)
    }
    const baseURL = argv[2];
    const initPages = {} 
    const resultPages = await crawlPage(baseURL, baseURL, initPages);
    printReport(resultPages)
}

main();