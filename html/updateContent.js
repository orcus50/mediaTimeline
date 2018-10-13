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

                    count ++;

                    //Get the chapters
                    var chapters = hosts[row.host].scrapeChapters(site, row.host);

                    //Is there a new one out?
                    if (chapters.length != row.contentCount){

                        for (var i=0; i< chapters.length - row.contentCount; i++){
                            insertContent(chapters[i].link, chapters[i].name, row.id);
                        }

                        con.query("update suppliers set contentCount = "+chapters.length+" where url = '"+row.url+"';");
                    }

                    //If its the last connection, end the program after a sec to allow last requests
                    count --;
                    if (count == 0){
                        setTimeout(process.exit, 1000);
                    }
            });
            
        });


    });

});

function insertContent (url, name, supplierID){
    con.query("insert into content (url,name,supplierID) values ('"+url+"', '"+name+"', '"+supplierID+"');", function(err, result)
    {/*
        if (err) 
            Console.log("err");
        else
            console.log("inserted content "+name+" to have "+url);*/

    });
}
  
