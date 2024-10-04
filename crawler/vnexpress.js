const cheerio = require('cheerio');

const request = require('request-promise');

request('https://vnexpress.net/the-thao', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.item-news').each((index, el) => {
            const title = $(el).find('.title-news a').text();
            const description = $(el).find('.description a').text();

            console.log(title, description);
        })
    }
    else {
        console.log(error);
    }
});