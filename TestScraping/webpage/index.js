function requestData(){

    url = document.getElementById("siteInput").value;

    jQuery.ajax({
        type: "POST",
        url: 'getData.php',
        dataType: 'json',
        data: {url: url},
        complete: function (response) {
            document.getElementById("dataView").innerHTML = response.responseText;
        }
    });
}

