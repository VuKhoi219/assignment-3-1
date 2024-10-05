const axios = require('axios');
const cheerio = require('cheerio');
const News = require('../models/news');

const sources = [
    {
        name: 'VnExpress',
        url: 'https://vnexpress.net/',
        selector: 'h2.title a',
        descriptionSelector: 'div.description',
    },
    {
        name: 'Báo Thanh Niên',
        url: 'https://thanhnien.vn/',
        selector: 'h3.title a',
        descriptionSelector: 'p.description',
    },
];

const fetchNews = async () => {
    for (const source of sources) {
        try {
            const { data } = await axios.get(source.url);
            const $ = cheerio.load(data);

            $(source.selector).each(async (index, element) => {
                const title = $(element).text();
                const link = $(element).attr('href');
                const description = $(element).find(source.descriptionSelector).text() || 'Không có mô tả';

                if (title && link) {
                    const newsItem = new News({
                        title,
                        description,
                        link,
                        source: source.name,
                        date: new Date(),
                    });

                    await newsItem.save();
                    console.log(`Saved ${title}`);
                }
            });
        } catch (error) {
            console.error(`Error fetching from ${source.name}:`, error);
        }
    }
};

module.exports = fetchNews();
