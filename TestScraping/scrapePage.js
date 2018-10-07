const rp = require('request-promise');
const cheerio = require('cheerio');
const readline = require('readline');
const parse = require('url-parse');

//Read Console Input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter URL:', (answer) => {
    scrape(answer, function(response) {
        console.log(response);
    });
    rl.close();
});

function scrape(url, response){

    //Parse the url for data
    var elements = parse(url, true);
    var host = elements.hostname;

    url = formatUrl(url, host);

    //Parse the site data
    var options = {
        uri: url,
        transform: function (body) {
          return cheerio.load(body);
        }
    };

    //var installments = rp(options).then((site) => getChapters(site,host));
      
    rp(options)
        .then((site) => {
            var chapters = getChapters(site, host);
            response({
                hostName: host,
                installments: chapters
            })
        });

}

function formatUrl(url, host){

    if (host == "mangarock.com"){
        return url;
    }
    if (host == "www.wattpad.com"){
        if (!url.endsWith("/parts"))
            url += "/parts";
        return url;
    }

}


function getChapters(site, host){

    var chapters = [];

    if (host == "mangarock.com"){
        site('._3bNVU').each(function(i, elem){
            chapters.push(cleanText(site(this).text()));
        });
    }



    if (host == "www.wattpad.com"){
        site('.table-of-contents li').each(function(i, elem){
            chapters.push(cleanText(site(this).text()));
        });
    }

    return chapters;
}

function cleanText(text){
    return text.replace(/[^0-9a-zA-Z ]/g, '');
}

//console.log(scrape("https://mangarock.com/manga/mrs-serie-100219362"));



/*

  */