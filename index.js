import axios from 'axios';
import { load } from 'cheerio';
import express from 'express';
const app = express();
import cors from 'cors';

app.use(cors());

const url = 'https://www.theguardian.com/uk';

app.get('/', (req, res) => {
    res.json('This is my webscraper');
});

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = load(html);
            const articles = [];
            $('.fc-item__title', html).each( _ => {
                const title = $(this).text();
                const url = $(this).find('a').attr('href');
                articles.push({
                    title,
                    url
                });
            })
            res.json(articles)
        }).catch(err => console.log(err));
});


const PORT = 3000;
app.listen(PORT, _ => console.log(`server running on PORT ${PORT}`));