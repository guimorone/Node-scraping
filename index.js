import axios from 'axios';
import { load } from 'cheerio';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.static('public'));

const url = 'https://www.theguardian.com/uk';

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/results', async (req, res) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = load(html);
        // isso aqui depende da página que está pesquisando
        const elements = $('.fc-item__title', html);
        const articles = [];

        for(let i = 0; i < elements.length; i++) {
            try {
                // isso aqui depende da página que está pesquisando
                // área do artigo (sobre o que ou quem estamos falando)
                const subject = elements[i.toString()].children[0].children[0].children[0].data;
                // link do artigo
                const urlArtigo = elements[i.toString()].children[0].attribs.href;
                articles.push({
                    subject,
                    urlArtigo
                });
            } catch (exception) {
                continue;
            }
                    
        }

        res.json(articles);
    } catch (exception) {
        process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
    }
});


const PORT = 3000;
app.listen(PORT, _ => console.log(`server running on PORT ${PORT}`));