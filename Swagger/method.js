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

function reqListener(){
		if(request.status == 200){
			failureText.innerHTML = "";
			successText.innerHTML = "Specimen creation succesful with " + request.responseText + " as response.";
		}
		else{
			successText.innerHTML = "";
			failureText.innerHTML = "Failed to create specimen!";
		}
	}
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

function onCreate(){
  $( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      modal: true,
      close: closeFunction(),
      show: {
        effect: "scale",
        duration: 250
      },
      hide: {
        effect: "clip",
        duration: 250
      }
    }).prev(".ui-dialog-titlebar").css("background","#e6ffff");
 	
 	$( "#dialog" ).dialog({
  	minWidth: 700
		});
 	//$( "#dialog" ).dialog( "option", "minHeight", 400 );
	$( "#dialog" ).dialog({
	  closeText: ""
	});

    $( "#opener" ).on( "click", function() {
      $( "#dialog" ).dialog( "open" );
    });
  });
}

function closeFunction(){
	var successText = document.getElementById("txtSuccessCreation");
	var failureText = document.getElementById("txtFailureCreation");
	document.getElementById("txtNameCreateHero").value = "";
	document.getElementById("txtDescriptionCreateHero").value = "";
	successText.innerHTML = "";
	failureText.innerHTML = "";
}