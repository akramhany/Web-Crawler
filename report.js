function printReport(pages) {
    console.log('Generating Reports...');
    pages = sortPages(pages);
    for (let page in pages) {
        console.log(`Found ${pages[page]} internal links to ${page}`)
    }
}

function sortPages(pages) {
    const sortedEntries = Object.entries(pages).sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(sortedEntries);
}

module.exports = {
    printReport,
}