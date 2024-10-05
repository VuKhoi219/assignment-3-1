const fetchNews = require('./crawler');
const cron = require('node-cron');
const mongoose = require('mongoose');
require('../models/news');

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

cron.schedule('* * */1 * * ', () => {
    console.log('Fetching news...');
    fetchNews();
})

console.log('News aggregator is running...');