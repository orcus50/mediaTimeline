function getHosts() {
    return {

        /*
            MANGAROCK
        */
        "mangarock.com" : {

            formatURL: function(url){

                return url;
            
            },
            scrapeChapters: function(site, host){

                var chapters = [];

                site('._3bNVU').each(function(i, elem){

                    var name = cleanText(site(this).text());
                    var link = (site(this).children()['1']);
                    
                    if (link == undefined)
                        link = host + site(this).children()['0']['attribs']['href'];
                    else
                        link = host + link['attribs']['href'];
                    
                    chapters.push({
                        name: name,
                        link: link
                    });
                });
            
                return chapters;
            },
            scrapeName: function(site){
                return cleanText(site('._3kDZW').text());
            },
            scrapeIcon: function(site){
                
                var icon = site(".xDVZZ._2KER_").children()['0'];
                console.log(icon);
                return "https://mangarock.com/svg/mr_logo_beta.svg";
            }
             
        },
         
        /*
            FANFOX
        */
        "fanfox.net": {

            formatURL: function(url){

                return url;
            
            },
            scrapeChapters: function(site){

                var chapters = [];

                site('.chlist').find("div > h4, div > h3").each(function(i, elem){
                    chapters.push(cleanText(site(this).text()));
                });
            
                return chapters;
            }
             
        }
    }
}

//Format site data to be alphanumeric
function cleanText(text){
    return text.replace(/[^0-9a-zA-Z .]/g, '').trim();
}

module.exports = {getHosts};



