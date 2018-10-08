const rp = require('request-promise');
const cheerio = require('cheerio');
const readline = require('readline');
const parse = require('url-parse');
const mysql = require('mysql');

//Get host information
var hosts = require('./hostPreferences.js').getHosts();

//Connect to database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: 'mediaTracker'
  });

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

con.connect((err) => {
    if (err) throw err;
     
    rp(options)
        .then((site) => {

            //Data
            var chapters = hosts[host].scrapeChapters(site);
            var name = hosts[host].scrapeName(site);
            var icon = hosts[host].scrapeIcon(site);

            var data = {
                url: url,
                host: host,
                name: name,
                icon: icon,
                chapters: chapters.length
            }

            var request = 'insert into suppliers (url,host,name,icon,contentCount) values('+
                '\''+data.url+'\','+
                '\''+data.host+'\','+
                '\''+data.name+'\','+
                '\''+data.icon+'\','
                    +data.count+")";

            con.query(request);
            console.log(data);
            process.exit();
            
        });
});
