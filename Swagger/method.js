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
    failureText.innerHTML = "";
    successText.innerHTML = "";

    function reqPostListener() {
        if (request.status == 200) {
            failureText.innerHTML = "";
            successText.innerHTML = "Specimen creation succesful with " + request.responseText + " as response.";
        } else {
            successText.innerHTML = "";
            failureText.innerHTML = "Failed to create specimen!";
        }
        document.getElementById("txtNameCreateHero").value = "";
        document.getElementById("txtDescriptionCreateHero").value = "";
        getSpecies();
    }
}

function putSpecimen(id, name, description) {

    var url = "http://81.2.241.234:8080/species/" + id;
    params = 'name=' + name + '&desc=' + description;
    var request = new XMLHttpRequest();
    request.open('PUT', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.addEventListener('load', reqPutListener);
    request.send(params);
    var successText = document.getElementById("txtSuccessModification");
    var failureText = document.getElementById("txtFailureModification");
    failureText.innerHTML = "";
    successText.innerHTML = "";

    function reqPutListener() {
        if (request.status == 200) {
            failureText.innerHTML = "";
            successText.innerHTML = "Specimen update succesful with " + request.responseText + " as response.";
            getSpecies();
        } else {
            successText.innerHTML = "";
            failureText.innerHTML = "Failed to update specimen!";
        }
    }
}

function getSpecies() {
    var url = "http://81.2.241.234:8080/species?start=0&count=100&orderfield=id&orderdirection=ASC";

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
                columns: [
                    { "dataSet": "id" },
                    { "dataSet": "name" },
                    { "dataSet": "description" },
                ],
                "columnDefs": [{
                        "targets": 3,
                        "data": null,
                        "defaultContent": '<button id="modificationOpener" onClick="onModificationClick(this)" class="edit-button btn btn-lg btn-block">Edit</button>'
                    },
                    {
                        "targets": 4,
                        "data": null,
                        "defaultContent": '<button id="deletionOpener" onClick="onRemovalDialog(this)" class="btn btn-lg btn-block">Remove</button>'
                    }
                ]
            });
        });
    }
}

function getSpecimenData(button) {
    var data = $('#speciesListTable').DataTable().row($(button).parents('tr')).data();
    return data;
};


function onDeletionAccepted(button) {
    var data = $('#speciesListTable').DataTable().row($(button).parents('tr')).data();
    startDeletion(data[0]);
};

function startDeletion(id) {
    var url = "http://81.2.241.234:8080/species/" + id;

    var request = new XMLHttpRequest();
    request.open('DELETE', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.addEventListener('load', reqDeleteListener);
    request.send();

    var successText = document.getElementById("txtSuccessDeletion");
    var failureText = document.getElementById("txtFailureCreation");
    failureText.innerHTML = "";
    successText.innerHTML = "";

    function reqDeleteListener() {
        if (request.status == 200) {
            failureText.innerHTML = "";
            successText.innerHTML = "Specimen deleted succesfully.";
        } else {
            successText.innerHTML = "";
            failureText.innerHTML = "Failed to delete specimen!";
        }
        getSpecies();
    }
}

function onCreate() {
    $(function() {
        $("#creationDialog").dialog({
            autoOpen: false,
            resizable: false,
            closeText: "",
            modal: true,
            show: {
                effect: "scale",
                duration: 250
            },
            hide: {
                effect: "clip",
                duration: 250
            }
        }).prev(".ui-dialog-titlebar").css("background", getComputedStyle(document.documentElement)
            .getPropertyValue('--alternative-accent-color-dark-sky-blue'));

        $("#creationDialog").dialog({
            minWidth: 700
        });

        $("#btnAddSpecimen").on("click", function() {
            $("#creationDialog").dialog("open");
        });
    });
    getSpecies();
}

function onModificationClick(button) {
    $(function() {
        $("#modificationDialog").dialog({
            autoOpen: false,
            resizable: false,
            closeText: "",
            modal: true,
            show: {
                effect: "scale",
                duration: 250
            },
            hide: {
                effect: "clip",
                duration: 250
            }
        }).prev(".ui-dialog-titlebar").css("background", getComputedStyle(document.documentElement)
            .getPropertyValue('--alternative-accent-color-dark-sky-blue'));

        $("#modificationDialog").dialog({
            minWidth: 600
        });
        $("#modificationDialog").dialog("open");
        var data = getSpecimenData(button);
        var txtSpecimenIDModification = document.getElementById("txtIDModifySpecimen");
        txtSpecimenIDModification.value = data[0];
        txtSpecimenIDModification.disabled = true;
        document.getElementById("txtNameModifySpecimen").value = "";
        document.getElementById("txtDescriptionModifySpecimen").value = "";
        var btnModifySpecimen = document.getElementById("btnModifySpecimen");
        btnModifySpecimen.onclick = function() {
            var name = document.getElementById("txtNameModifySpecimen").value;
            var description = document.getElementById("txtDescriptionModifySpecimen").value;
            putSpecimen(data[0], name, description);
        }
    });
}

function onRemovalDialog(button) {
    $(function() {
        $("#deletionDialog").dialog({
            autoOpen: false,
            resizable: false,
            closeText: "",
            modal: true,
            show: {
                effect: "scale",
                duration: 250
            },
            hide: {
                effect: "clip",
                duration: 250
            }
        }).prev(".ui-dialog-titlebar").css("background", getComputedStyle(document.documentElement)
            .getPropertyValue('--alternative-accent-color-dark-sky-blue'));

        $("#deletionDialog").dialog({
            minWidth: 500
        });
        $("#deletionDialog").dialog({
            minHeight: 225
        });
        $("#deletionDialog").dialog("open");
    });
    var btnCancel = document.getElementById("btnCancelSpecimenRemoval");
    var btnOk = document.getElementById("btnAcceptSpecimenRemoval");
    btnOk.onclick = function() {
        onDeletionAccepted(button);
    }
    btnCancel.onclick = function() {
        $("#deletionDialog").dialog("close");
    }
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(135, 147, 136,100)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--secondary-color-nyanza-light');
}