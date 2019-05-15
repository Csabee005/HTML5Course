function postSpecimen() {
    var url = "http://81.2.241.234:8080/species";

    var name = document.getElementById("txtNameCreateHero").value;
    var description = document.getElementById("txtDescriptionCreateHero").value;
    var params = 'name=' + name + '&desc=' + description;

    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.addEventListener('load', reqPostListener);
    request.send(params);
    var successText = document.getElementById("txtSuccessCreation");
    var failureText = document.getElementById("txtFailureCreation");

    function reqPostListener() {
        if (request.status == 200) {
            failureText.innerHTML = "";
            successText.innerHTML = "Specimen creation succesful with " + request.responseText + " as response.";
        } else {
            successText.innerHTML = "";
            failureText.innerHTML = "Failed to create specimen!";
        }
    }
}

function putSpecimen() {
    var url = "http://81.2.241.234:8080/species/1640";

    var name = document.getElementById("txtNameCreateHero").value;
    var description = document.getElementById("txtDescriptionCreateHero").value;
    var params = 'id=1640&';
    params = 'name=' + name + '&desc=' + description;
    //ID = 1640
    var request = new XMLHttpRequest();
    request.open('PUT', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.addEventListener('load', reqPutListener);
    request.send(params);
    var successText = document.getElementById("txtSuccessCreation");
    var failureText = document.getElementById("txtFailureCreation");

    function reqPutListener() { document.body.innerHTML = request.responseText; }
}

function getSpecies() {
    var url = "http://81.2.241.234:8080/species";
    //var count = 20;
    //var params = 'count=' + 5 * count;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.addEventListener('load', reqGetListener);
    request.send();

    function reqGetListener() {
        var jsonArray = JSON.parse(request.responseText);
        var dataSet = [];
        for (var i = 0; i < jsonArray.length; i++) {
            var data = [];
            data.push(jsonArray[i].id, jsonArray[i].name, jsonArray[i].description);
            dataSet.push(data);
        }

        table = $('#speciesListTable').DataTable();
        table.destroy();
        $(document).ready(function() {
            $('#speciesListTable').DataTable({
                data: dataSet,
                "columnDefs": [{
                    "targets": -1,
                    "data": null,
                    "defaultContent": "<button>Click!</button>"
                }]
            });
        });
    }
}

function onCreate() {
    $(function() {
        $("#creationDialog").dialog({
            autoOpen: false,
            modal: true,
            show: {
                effect: "scale",
                duration: 250
            },
            hide: {
                effect: "clip",
                duration: 250
            }
        }).prev(".ui-dialog-titlebar").css("background", "#e6ffff");

        $("#creationDialog").dialog({
            minWidth: 700
        });
        //$( "#dialog" ).dialog( "option", "minHeight", 400 );
        $("#creationDialog").dialog({
            closeText: ""
        });

        $("#creationOpener").on("click", function() {
            $("#creationDialog").dialog("open");
        });
    });

    $(function() {
        $("#modificationDialog").dialog({
            autoOpen: false,
            modal: true,
            show: {
                effect: "scale",
                duration: 250
            },
            hide: {
                effect: "clip",
                duration: 250
            }
        }).prev(".ui-dialog-titlebar").css("background", "#e6ffff");

        $("#modificationDialog").dialog({
            minWidth: 700
        });
        //$( "#dialog" ).dialog( "option", "minHeight", 400 );
        $("#modificationDialog").dialog({
            closeText: ""
        });

        $("#modificationOpener").on("click", function() {
            $("#modificationDialog").dialog("open");
        });
    });
}