function method1(){
var url = "http://81.2.241.234:8080/species";

var name = document.getElementById("txtNameCreateHero").value;
var description = document.getElementById("txtDescriptionCreateHero").value;
var params = 'name='+name+'&desc='+description;

var request = new XMLHttpRequest();
request.open('POST', url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener('load', reqListener);
request.send(params);

function reqListener(){document.body.innerHTML = request.responseText;}
}

function method2(){
var url = "http://81.2.241.234:8080/species/1640";

var name = document.getElementById("txtNameCreateHero").value;
var description = document.getElementById("txtDescriptionCreateHero").value;
var params = 'id=1640&';
params = 'name='+name+'&desc='+description;
//ID = 1640
var request = new XMLHttpRequest();
request.open('PUT', url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener('load', reqListener);
request.send(params);

function reqListener(){document.body.innerHTML = request.responseText;}
}