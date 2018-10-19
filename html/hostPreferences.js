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
            
                return {
                    chapters: chapters,
                    count: chapters.length
                };
            },
            scrapeName: function(site){
                return cleanText(site('._3kDZW').text());
            },
            scrapeIcon: function(site){
                return "https://mangarock.com/svg/mr_logo_beta.svg";
            }
             
        },
         
        /*
            RoyalRoad
        */
       "www.royalroad.com" : {

        formatURL: function(url){

            return url;
        
        },
        scrapeChapters: function(site, host){

            var chapters = [];

            site('tbody > tr').each(function(i, elem){

                elem = elem.children[1].children[1];

                chapters.push({
                    name: cleanText(elem.children[0].data),
                    link: host + elem.attribs['href']
                });
            });
        
            return {
                chapters: chapters.reverse(),
                count: chapters.length
            };
        },
        scrapeName: function(site){
            return cleanText(site('h1').text());
        },
        scrapeIcon: function(site){ 
            return site('.thumbnail')['0'].attribs["src"];
        }
         
        },
        /*
             Web Toons
        */
        "www.webtoons.com" : {

        formatURL: function(url){

            return url;

        },
        scrapeChapters: function(site, host){

            var chapters = [];

            site('#_listUl > li').each(function(i, elem){

                elem = elem.children[1];

                chapters.push({
                    name: cleanText(elem.children[3].children[0].children[0].data),
                    link: elem.attribs['href'].substr(8)
                });

            });


            count = parseInt(site('.tx')[0].children[0].data.substr(1));

            return {
                chapters: chapters,
                count: count
            };
        },
        scrapeName: function(site){
            return cleanText(site('h1').text());
        },
        scrapeIcon: function(site){ 
            return site('.detail_header > .thmb > img')['0'].attribs["src"];
        }
        
        },
    }
}

//Format site data to be alphanumeric
function cleanText(text){
    return text.replace(/[^0-9a-zA-Z .]/g, '').trim();
}

module.exports = {getHosts};



