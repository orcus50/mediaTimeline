var date, post, logged, butt, subbed;

function onload(){

    var d = document.getElementById("Date");
    var p = document.getElementById("Post");

    date = d.cloneNode(true);
    post = p.cloneNode(true);
    
    d.parentElement.removeChild(d);
    p.parentElement.removeChild(p);

    checkLogin();

}

/*
    JQuery Calls
*/

function checkLogin(){
    
    $.ajax({
        type: 'POST',
        url: 'validUser.php',
        data: { user: params.user, pass: params.password }, 
        success: function(d){
            if (d == "Valid"){
                $("#login")[0].innerHTML = "Logged in as "+capitalizeFirstLetter(params.user).bold();
                butt = "Logged in as "+capitalizeFirstLetter(params.user).bold();
                logged = true;
                //Do Posts
                posts();
            }
            else{
                logged = false;
                addDate("Login to view feed");
            }
        }
      });
}

function scrapeUrl(){  
    $.ajax({
        type: 'POST',
        url: 'scrape.php',
        data: { url:$('input')[0].value, user: params.user, pass: params.password}, 
        success: function(o){
            var output = parse(o);
            //console.log(output);
            
            if (output.valid=="true"){
                $('.siteInfo > img')[0].src = output.icon;
                $('.siteInfo > #Name')[0].innerHTML ="Name: ".bold()+ output.name;
                $('.siteInfo > #Host')[0].innerHTML ="Host: ".bold()+ output.host;
                $('.siteInfo > #Supported')[0].innerHTML ="Supported: ".bold()+"Yep";
                $('.siteInfo > #Chapters')[0].innerHTML = "Installments: ".bold() +output.chapters;
                $('.siteInfo > #Latest')[0].innerHTML = "Latest: ".bold() +output.recentChapters;
                $('.siteInfo > #URL')[0].innerHTML = output.url;

                if (output.subbed == "yes"){
                    $('.siteInfo > #add')[0].innerHTML = "Drop";
                    subbed = true;
                }
                if (!logged)
                    $('.siteInfo > #add')[0].innerHTML = "Login to add";
                
            }
        }
      });
}

function posts(){
    $.ajax({
        type: 'POST',
        url: 'getPosts.php',
        data: { user: params.user, pass: params.password}, 
        success: function(output){
            
            var date = "";

            var o = output.split("\n");
            var posts = [];

            for (var i = 0; i < o.length; i+=6){

                var postData = {};

                postData.url = o[i];
                postData.chapter = o[i+1];
                postData.host = o[i+2];
                postData.icon = o[i+3];
                postData.name =o[i+4];
                postData.time = o[i+5].split(" ")[0];

                if (postData.time != date){
                    date = postData.time;
                    addDate(postData.time);
                }

                addPost(postData.icon, postData.name, postData.chapter, postData.url, postData.host);
            }
        }
      });
}

function subscribe(){
    if (!logged) {
        
        window.location = "../loginSignup/login.html";
        return;
    }
    else if (subbed){
        //DROP
        return;
    }
    else{

        //TODO validate acount

        $.ajax({
            type: 'POST',
            url: 'addMedia.php',
            data: { user: params.user, pass: params.password, url:$('input')[0].value}, 
            success: function(o){
                console.log(o);
                $('.siteInfo > #add')[0].innerHTML = "Drop";
            }
          });


        //is the media on our database allready
            //Yes? add it to your list
            //No? add it to database, then yes

    }
}

/*
    Utility
*/
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function parse(o){
    var out = {};
    var rows = o.split("\n");
    rows.forEach(function(element) {
        var segs = element.split("?=");
        out[segs[0]] = segs[1];

      });
      
    return out;
}

/*
    Respincivity
*/
function view(e){
    e.childNodes[1].style.opacity = "1";
}
function notView(e){
    e.childNodes[1].style.opacity = "0";
}

function probeUrl(){
    document.getElementById("dropdown").style.top = "8vh";
    scrapeUrl();
}

function retract(){
    document.getElementById("dropdown").style.top = "-300px";    
}
function login(){
    if (logged)
        window.location = "../home/index.html";
    else
        window.location = "../loginSignup/login.html";
}


/*
    Show Results
*/
function addDate(dateTime){
    var nextDate = date.cloneNode(true);
    nextDate.childNodes[1].innerText = dateTime;
    document.getElementById("feed").appendChild(nextDate);
}
function addPost(imgURL, name, chapter, url, site){

    var newPost = post.cloneNode(true);
    document.getElementById("feed").appendChild(newPost);
    
    $("#Post>#ContentName")[0].innerHTML = name.bold();
    $("#Post>#ChapterName")[0].innerHTML = "Installment: ".bold()+chapter;
    $("#Post>#DirectLink")[0].innerText = url;
    $("#Post>#SiteName")[0].innerText = site;
    $("#Post>a")[0].href = "https://"+url;
    $("#Post>a>img")[0].src = imgURL;

    newPost.id = "posted";
}

/*
    Params
*/
function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

var params = getSearchParameters();
//https://mangarock.com/manga/mrs-serie-100219362