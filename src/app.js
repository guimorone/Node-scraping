const feedDisplay = document.querySelector('#feed');
import { PORT } from '../index';

fetch(`http://localhost:${PORT}/results`)
    .then(response => response.json())
    .then(data => {
        data.forEach(article => {
            const articleItem = `<div><h3>` + article.title + `</h3><p>` + article.url + `</p></div>`
            feedDisplay.insertAdjacentHTML("beforeend", articleItem);
        })
    })
    .catch(err => console.log(err));
