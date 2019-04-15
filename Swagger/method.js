function method1(){
var url = "http://81.2.241.234:8080/species";
var parms = 'name=somethingsomething&desc=descriptionsText';

var request = new XMLHttpRequest();
request.open('POST', url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener('load', reqListener);
request.send(parms);

function reqListener(){document.body.innerHTML = request.responseText;}
}