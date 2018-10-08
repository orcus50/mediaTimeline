function getHosts() {
    return {

        /*
            MANGAROCK
        */
        "mangarock.com" : {

            formatURL: function(url){

                return url;
            
            },
            scrapeChapters: function(site){

                var chapters = [];

                site('._3bNVU').each(function(i, elem){
                    chapters.push(cleanText(site(this).text()));
                });
            
                return chapters;
            },
            scrapeName: function(site){
                return cleanText(site('._3kDZW').text());
            },
            scrapeIcon: function(site){
                
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



