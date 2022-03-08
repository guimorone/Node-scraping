const feedDisplay = document.querySelector('#feed');
const today = new Date();

function reverseString(s) {
    return [...s].reverse().join("");
}

function articleName(url) {
    const reverseUrl = reverseString(url);
    let name = '';

    for(let i = 0; i < reverseUrl.length; i++) {
        let a = reverseUrl[i];

        if(a === '-') a = ' ';
        else if (a === '/') break;

        name += a;
    }

    return reverseString(name);
}

fetch('http://localhost:3000/results')
    .then(response => response.json())
    .then(data => {
        data.forEach(article => {
            if(!article.subject) {
                article.subject = 'Without subject';
            }
            if (!article.urlArtigo){
                article.urlArtigo = '';
            }
            const articleItem = `<div><h3>${article.subject}</h3><a href="${article.urlArtigo}" target="_blank">${articleName(article.urlArtigo)}</a></div>`
            feedDisplay.insertAdjacentHTML("afterend", articleItem);
        })
    })
    .catch(err => console.log(err));