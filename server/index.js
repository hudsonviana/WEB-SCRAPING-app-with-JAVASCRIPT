// import scrapers from './scraper';
const express = require('express');
const app = express();
const scrapers = require('./scraper');
const db = require('./db');
const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/creators', async (req, res) => {
    // const creators = [
    //     {name: 'Hudson', avatarUrl: 'https://'},
    //     {name: 'Eliane', avatarUrl: 'https://'},
    //     {name: 'Maria', avatarUrl: 'https://'},
    // ];
    const creators = await db.getAllCreators();
    res.send(creators);
});

app.post('/creators', async (req, res) => {
    console.log(req.body);
    const channelData = await scrapers.scrapeChannel(req.body.channelUrl);
    const creators = await db.insertCreator(channelData.name, channelData.avatarUrl, req.body.channelUrl);
    res.send(creators);
});

app.listen(port, () => console.log(`Exemple app lintening on port ${port}!`));
