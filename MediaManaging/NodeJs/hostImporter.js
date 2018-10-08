const rp = require('request-promise');
const cheerio = require('cheerio');
const readline = require('readline');
const parse = require('url-parse');

//Get host information
var hosts = require('./hostPreferences.js').getHosts();

//Url passed in to identify
var url = process.argv[2];

var elements = parse(url, true);
var host = elements.hostname;

url = hosts[host].formatURL(url);

//Parse the site data
var options = {
    uri: url,
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then((site) => {

        //Data
        var chapters = hosts[host].scrapeChapters(site);
        var name = hosts[host].scrapeName(site);
        var icon = hosts[host].scrapeIcon(site);

        console.log(url);
        console.log(host);
        console.log(name);
        console.log(icon);
        console.log(chapters.length);

        process.exit();
        
    });
