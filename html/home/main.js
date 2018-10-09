var date, post;

function onload(){

    var d = document.getElementById("Date");
    var p = document.getElementById("Post");

    date = d.cloneNode(true);
    post = p.cloneNode(true);
    
    d.parentElement.removeChild(d);
    p.parentElement.removeChild(p);

    if (params.user != "" & params.password != ""){
        //TODO check if valid user

        //TODO get feed

        addDate();
        addPost();
        addPost();
        addPost();
        addDate();
        addPost();
        addPost();
        addDate();
        addPost();

    }
}

function view(e){
    e.childNodes[1].style.opacity = "1";
}
function notView(e){
    e.childNodes[1].style.opacity = "0";
}

function addDate(){
    document.getElementById("feed").appendChild(date.cloneNode(true));
}
function addPost(){
    document.getElementById("feed").appendChild(post.cloneNode(true));
}

function probeUrl(){
    document.getElementById("dropdown").style.top = "50px";
}

function retract(){
    document.getElementById("dropdown").style.top = "-250px";    
}

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