function method1(){
var url = "http://81.2.241.234:8080/species";
var params = 'name=somethingsomething123&desc=descriptionTest123';

var request = new XMLHttpRequest();
request.open('POST', url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener('load', reqListener);
request.send(params);

function reqListener(){document.body.innerHTML = request.responseText;}
}