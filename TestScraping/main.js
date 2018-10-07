const rp = require('request-promise');
const cheerio = require('cheerio');
const readline = require('readline');
const parse = require('url-parse');

const options = {
    uri: `https://mangarock.com/manga/mrs-serie-100260319`,
    transform: function (body) {
      return cheerio.load(body);
    }

  };

  rp(options)
    .then(($) => {
        $('._3bNVU').each(function(i, elem) {
            console.log($(this).text());
          });
    })
    .catch((err) => {
        console.log(err);
    });



function scrape(url){
    
    //Parse the url for data
    var elements = parse(url, true);

    //Name of server host
    var host = elements.hostname;



    return {
        hostName: host
    }
}

//console.log(scrape("https://mangarock.com/manga/mrs-serie-100219362"));



/*
rl.question('Enter URL:', (answer) => {

    console.log(scrape(answer));
    rl.close();

});*/

/*
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  */