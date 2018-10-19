/*
    Compare the subscription data with the data from the websites and update the content list
*/
const rp = require('request-promise');
const cheerio = require('cheerio');
const readline = require('readline');
const parse = require('url-parse');
const mysql = require('mysql');

//Get host information
var hosts = require('./hostPreferences.js').getHosts();
count = 0;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: 'mediaTracker'
  });
  
con.connect(function(err) {
if (err) throw err;

    con.query("select * from suppliers", function (err, result) {
        if (err) throw err;

        con.query("DELETE FROM content  WHERE time < NOW() - INTERVAL 7 DAY;")

        //Look through each row in suppliers
        result.forEach(function(row) {
            
            //Parse the site data
            var options = {
                uri: row.url,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };

            rp(options)
                .then((site) => {

                    //Get the chapters
                    var chapters = hosts[row.host].scrapeChapters(site, row.host);

                    //Is there a new one out?
                    if (chapters.count != row.contentCount){

                        for (var i=0; i< chapters.count - row.contentCount; i++){
                            insertContent(chapters.chapters[i].link, chapters.chapters[i].name, row.id);
                        }

                        con.query("update suppliers set contentCount = "+chapters.count+" where url = '"+row.url+"';",function(err, rows, fields) {
                            
                        });
                    }
                    else{

                     }
            });


        });

    });

});

function insertContent (url, name, supplierID){
    con.query("insert into content (url,name,supplierID) values ('"+url+"', '"+name+"', '"+supplierID+"');");
}
  
