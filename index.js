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

app.get('/results', async (req, res) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = load(html);
        const elements = $('.fc-item__title', html);
        const articles = [];

        for(let i = 0; i < elements.length; i++) {
            try {
                // título do artigo
                console.log(elements[i.toString()]);
                const title = elements[i.toString()].children[0].children[0].children[0].data;
                // link do artigo
                const urlArtigo = elements[i.toString()].children[0].attribs.href;
                articles.push({
                    title,
                    urlArtigo
                });
            } catch (exception) {
                // tem dado erro falando
                continue;
            }
            
        }

        res.json(articles);
    } catch (exception) {
        process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
    }
});


export const PORT = 3000;
app.listen(PORT, _ => console.log(`server running on PORT ${PORT}`));