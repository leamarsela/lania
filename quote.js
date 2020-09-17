const request = require('request');

const getNum = (max) => {

    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

setInterval(() => {

    let firstId = getNum(100);
    let secondId = getNum(7);

    request('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&page=' + firstId, (error, response, body) => {
    
        const dataBody = JSON.parse(body);

        const id = dataBody[secondId]['id'];

        const quote = dataBody[secondId]['content']['rendered'];

        const quoteBy = dataBody[secondId]['title']['rendered'];

        document.getElementById('quote').innerHTML = quote;
        document.getElementById('quoteBy').innerHTML = quoteBy;

    });
}, 20000);


